/**
 * Climate.js
 *
 * Created by Ben Cuan <ben@bananiumlabs.com>
 * https://github.com/dbqeo/climate.js
 *
 * Version 1.0.0 - December 27, 2018
 */
'use strict';

/**
 * Initializes climate theming. Required for this module to run.
 * @param {*} options The option parameters used for this configuration.
 * See the readme (https://github.com/dbqeo/climate.js#readme) for more details.
 */
export default function initClimate(options) {
  // attempt to get user location using ipinfo.io if specified
  if (options.userLocation) {
    if (options.useIP) {
      if (!options.ipAPIKey)
        throw new Error('useIP is true, but no ipinfo.io API key was provided!');

      setTheme(getLatLong(options), options); //subsequently calls getWeather
      if(options.interval > 0)
        setInterval(() => {setTheme(getLatLong(options), options)}, options.interval)
    }
    else {
      if (navigator && navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          setTheme(getWeather(position, options), options);
          if (options.interval > 0)
            setInterval(() => { setTheme(getWeather(position, options), options), options.interval}, options.interval);
        });
      }
      else {
        console.warn('Navigator not found, falling back to default location! Are you running this in a browser?')
        options.userLocation = false;
      }
    }
  }
  // Required if not else - userLocation changes after the initial if is run
  if (!options.userLocation) {
    if (!options.location) options.location = DEFAULTS.location;
    getWeather(options.location, options);
    if (options.interval > 0)
      setInterval(() => { getWeather(options.location, options), options.interval }, options.interval);
  }
}

/**
 * Fetches weather data from openweathermap. Use the result to call setTheme() afterwards.
 * @param {*} location The location data to be processed.
 * Can either be a lat/long pair ({latitude: ..., longitude: ...})
 * OR a city name ('San Francisco').
 * @param {*} options Options passed through initClimate()
 * @returns The object with weather data collected from OpenWeatherMap.
 */
export async function getWeather(location, options) {
  if (!options.weatherAPIKey)
    throw new Error('You must set a valid `weatherAPIKey` in `initClimate()`!');
  let response;

  if (location.coords.latitude) // Use lat/long
    response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${location.coords.latitude}&lon=${location.coords.longitude}&appid=${options.weatherAPIKey}`);
  else
    response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(location)}&appid=${options.weatherAPIKey}`);

  const weather = (await response.json());

  return weather;
}

/**
 * Uses collected data to find and set the color of theme indicators.
 * This is a public function in case you wish to manually configure weather patterns.
 * @param {*} weather Weather object as fetched from openweathermap
 * @param {*} options Options passed through initClimate()
 */
export async function setTheme(weather, options) {
  const theme = await (await fetch(options.theme)).json();

  if (!theme.use)
    throw new Error('`use` must be defined in climate.json!');

  let currTheme = (options.mode === 'temperature')
    ? theme.temperature[weather.main[theme.use.temperature]]
    : theme.weather[weather.weather[0][theme.use.weather]];

  for (let indicator in currTheme) {
    const elements = document.getElementsByClassName('climate-' + indicator);
    for (let element of elements) {
      element.style.color = currTheme[indicator];
    }
  }

}

/**
 * Gets the user's position from ipinfo, and calls getWeather() with the position.
 * @param {*} options Options passed through initClimate()
 * @returns {*} location in openWeatherMap format (location.coords.latitude or location.coords.longitude).
 */
export async function getLatLong(options) {
  const response = await (await fetch(`https://ipinfo.io/json?token=${options.ipAPIKey}`)).json();
  const loc = ('' + response.loc).split(',');
  const location = {
    coords: {
      latitude: loc[0],
      longitude: loc[1]
    }
  }

  return location;
}


/**
 * Convert from Kelvin to either Celsius or Fahrenheit, as specified.
 * @param {string} resultUnit What unit to convert to ('celsius' or 'fahrenheit')
 * @param {number} input Input Kelvin value.
 * @returns {number} The converted value.
 */
export function convertFromKelvin(resultUnit, input) {
  if(resultUnit.toLowerCase() === 'celsius')
    return input - 273.15;
  else if (resultUnit.toLowerCase() === 'fahrenheit')
    return (input - 273.15) * 9/5 + 32;
  else
    throw new Error('resultUnit must be celsius or fahrenheit!');
}

/**
 * Default values for initClimate() options, used if these options were not passed.
 */
const DEFAULTS = {
  location: 'San Francisco',
  mode: 'weather'
}
