/**
 * Climate.js
 *
 * Created by Ben Cuan <ben@bananiumlabs.com>
 * https://github.com/dbqeo
 */
'use strict';

/**
 * Initializes climate theming. Required for this module to run.
 * @param {*} options The option parameters used for this configuration.
 * See the readme (https://github.com/dbqeo/climate.js#readme) for more details.
 */
export default function initClimate(options) {
  // attempt to get user location using ipinfo.io if specified
  if(options.userLocation) {
    if(options.useIP) {
      if(!options.ipAPIKey)
        throw new Error('useIP is true, but no ipinfo.io API key was provided!');

      getLatLong(options.weatherAPIKey, options.theme, options.ipAPIKey); //subsequently calls getWeather
    }
    else {
      if(navigator && navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          getWeather(position, options.weatherAPIKey, options.theme);
        });
      }
      else {
        console.warn('Navigator not found, falling back to default location! Are you running this in a browser?')
        options.userLocation = false;
      }
    }
  }
  // Required if not else - userLocation changes after the initial if is run
  if(!options.userLocation) {
    if(!options.location) options.location = 'San Francisco'; // TODO move to globals
    getWeather(options.location, options.weatherAPIKey, options.theme);
  }
}

/**
 * Fetches weather data from openweathermap; calls setTheme() afterwards.
 * @param {*} location The location data to be processed.
 * Can either be a lat/long pair ({latitude: ..., longitude: ...})
 * OR a city name ('San Francisco').
 */
async function getWeather(location, apiKey, themeFile) {
  if(!apiKey)
    throw new Error('You must set a valid `weatherAPIKey` in `initClimate()`!');
  let response;
  if(location.coords.latitude) // Use lat/long
    response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${location.coords.latitude}&lon=${location.coords.longitude}&appid=${apiKey}`);
  else
    response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(location)}&appid=${apiKey}`);

  const weather = (await response.json());

  setTheme(themeFile, weather)
}


async function setTheme(themeFile, weather) {
 const theme = await (await fetch(themeFile)).json();
 console.log(weather);
}

async function getLatLong(apiKey, themeFile, ipAPIKey) {
  const response = await (await fetch(`https://ipinfo.io/json?token=${ipAPIKey}`)).json();
  const loc = ('' + response.loc).split(',');
  const location = {
    coords: {
      latitude: loc[0],
      longitude: loc[1]
    }
  }

  getWeather(location, apiKey, themeFile);
}
