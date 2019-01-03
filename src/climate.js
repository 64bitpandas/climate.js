/**
 * Climate.js
 *
 * Created by Ben Cuan <ben@bananiumlabs.com>
 * https://github.com/dbqeo/climate.js
 *
 * Version 1.1.0 - January 3, 2019
 */
'use strict';

/**
 * Initializes climate theming. Required for this module to run.
 * @param {*} options The option parameters used for this configuration.
 * See the readme (https://github.com/dbqeo/climate.js#readme) for more details.
 */
export function initClimate(options) {
  // attempt to get user location using ipinfo.io if specified
  if (options.userLocation) {
    if (options.useIP) {
      if (!options.ipAPIKey)
        throw new Error('useIP is true, but no ipinfo.io API key was provided!');

      getLatLong(options).then((data) => {
        getWeather(data, options).then((weatherData) => {
          setTheme(weatherData, options);
        });
      }); //subsequently calls getWeather
      if(options.interval > 0)
        setInterval(() => {getLatLong(options).then((data) => {
          getWeather(data, options).then((weatherData) => {
            setTheme(weatherData, options);
          });
        })}, options.interval)
    }
    else {
      if (navigator && navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          getWeather(position, options).then((weatherData) => {
            setTheme(weatherData, options);
          });
          if (options.interval > 0)
            setInterval(() => {
              getWeather(position, options).then((weatherData) => {
                setTheme(weatherData, options);
              });
            }, options.interval);
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
    getWeather(options.location, options).then((weatherData) => {
      setTheme(weatherData, options);
    });
    if (options.interval > 0)
      setInterval(() => {
        getWeather(position, options).then((weatherData) => {
          setTheme(weatherData, options);
        });
      }, options.interval);
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

  if (location.coords) // Use lat/long
    response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${location.coords.latitude}&lon=${location.coords.longitude}&appid=${options.weatherAPIKey}`);
  else
    response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(options.location)}&appid=${options.weatherAPIKey}`);

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
  let theme;
  try {
    theme = await (await fetch(options.theme)).json();
  } catch(error) {
    console.error('climate.json is missing or at the wrong location!');
  }

  if (!theme.use)
    throw new Error('`use` must be defined in climate.json!');

  let mode = options.mode;
  if(!mode)
    mode = DEFAULTS.mode;

  let currTheme = (theme.temperature.enabled)
    ? theme.temperature[weather.main[theme.use.temperature]]
    : theme.weather[weather.weather[0][theme.use.weather]];

  if(mode === 'color' || mode === 'all') {
    for (let indicator in currTheme) {
      const elements = document.getElementsByClassName('climate-' + indicator);
      for (let element of elements) {
        element.style.color = currTheme[indicator];
      }
    }
  } else if(mode === 'toggle' || mode === 'all') {
    const elements = document.getElementsByClassName('climate-toggle');
    for(let element of elements) {
      if(element.classList.contains('climate-' + currTheme))
        element.style.display = 'inherit';
      else
        element.style.display = 'none';
    }
  } else throw new Error('mode not recognized! Valid modes: color, toggle');
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
 * Returns coordinates regardless of the type of location detection (ip, geolocation, or none).
 * @param {*} options Options passed through initClimate()
 */
export async function getCurrentLocation(options) {
  if(options.userLocation) {
    // From ipinfo
    if(options.useIP) {
      return await getLatLong(options);
    }
    // From geolocation
    return await new Promise((resolve) => {
      navigator.geolocation.getCurrentPosition(resolve);
    });
  } else {
    // Use openweathermap to get the coordinates from query
    let response = await (await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(options.location)}&appid=${options.weatherAPIKey}`)).json();
    return {
      coords: {
        latitude: response.coord.lat,
        longitude: response.coord.lon
      }
    };
  }
}

/**
 * Default values for initClimate() options, used if these options were not passed.
 */
const DEFAULTS = {
  location: 'San Francisco',
  mode: 'all'
}
