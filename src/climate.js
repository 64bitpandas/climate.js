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

      getLatLong(options); //subsequently calls getWeather
    }
    else {
      if (navigator && navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          getWeather(position, options);
          if (options.interval > 0)
            setInterval(() => {getWeather(position, options), options.interval}, options.interval);
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
 * Fetches weather data from openweathermap; calls setTheme() afterwards.
 * @param {*} location The location data to be processed.
 * Can either be a lat/long pair ({latitude: ..., longitude: ...})
 * OR a city name ('San Francisco').
 * @param {*} options Options passed through initClimate()
 */
async function getWeather(location, options) {
  if (!options.weatherAPIKey)
    throw new Error('You must set a valid `weatherAPIKey` in `initClimate()`!');
  let response;

  if (location.coords.latitude) // Use lat/long
    response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${location.coords.latitude}&lon=${location.coords.longitude}&appid=${options.weatherAPIKey}`);
  else
    response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(location)}&appid=${options.weatherAPIKey}`);

  const weather = (await response.json());

  setTheme(weather, options);
}

/**
 * Uses collected data to find and set the color of theme indicators.
 * @param {*} weather Weather object as fetched from openweathermap
 * @param {*} options Options passed through initClimate()
 */
async function setTheme(weather, options) {
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
 */
async function getLatLong(options) {
  const response = await (await fetch(`https://ipinfo.io/json?token=${options.ipAPIKey}`)).json();
  const loc = ('' + response.loc).split(',');
  const location = {
    coords: {
      latitude: loc[0],
      longitude: loc[1]
    }
  }

  getWeather(location, options);
}

/**
 * Default values for initClimate() options, used if these options were not passed.
 */
const DEFAULTS = {
  location: 'San Francisco',
  mode: 'weather'
}
