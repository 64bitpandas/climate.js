import * as weather from 'weather.js';

/**
 * f
 * @param {*} options
 */
export default function initClimate(options) {
  // attempt to get user location if specified
  if(options.userLocation) {
    if(navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
    }
  }
}

function showPosition(position) {
  console.log(position.coords.latitude);
}
