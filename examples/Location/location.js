(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
'use strict';

var _climate = require('../../../src/climate');

var _climate2 = _interopRequireDefault(_climate);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _climate2.default)({
  userLocation: true,
  weatherAPIKey: 'ddebee7489203673401bc4663d43695c'
}); /**
     * Example that requests the user's current location and
     * adapts the color scheme to fit the user's weather.
     */

},{"../../../src/climate":2}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = initClimate;
// import * as weather from 'weather.js';
// import 'babel-polyfill';

/**
 * Initializes climate theming. Required for this module to run.
 * @param {*} options The option parameters used for this configuration.
 * See the readme (https://github.com/dbqeo/climate.js#readme) for more details.
 */
function initClimate(options) {
  // attempt to get user location using ipinfo.io if specified
  if (options.userLocation) {
    if (options.ipAPI) {
      // TODO
    } else {
      if (navigator && navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
          getWeather(position, options.weatherAPIKey);
        });
      } else {
        console.warn('Navigator not found, falling back to default location! Are you running this in a browser?');
        options.userLocation = false;
      }
    }
  }
  // Required if not else - userLocation changes after the initial if is run
  if (!options.userLocation) {
    if (!options.location) options.location = 'San Francisco'; // TODO move to globals
    getWeather(options.location);
  }
}

/**
 * Fetches weather data from openweathermap; calls setTheme() afterwards.
 * @param {*} location The location data to be processed.
 * Can either be a lat/long pair ({latitude: ..., longitude: ...})
 * OR a city name ('San Francisco').
 */
async function getWeather(location, apiKey) {
  if (!apiKey) throw new Error('You must set a valid `weatherAPIKey` in `initClimate()`!');
  let response;
  if (location.coords.latitude) // Use lat/long
    response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${location.coords.latitude}&lon=${location.coords.longitude}&appid=${apiKey}`);else response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(location)}&appid=${apiKey}`);

  console.log(response);
}

},{}]},{},[1]);
