/**
 * Example that allows user to configure the options and observe the resulting weather data (no theme demo).
 */

import initClimate, { getWeather, getCurrentLocation } from '../../../src/climate';

let options = {
  userLocation: true,
  weatherAPIKey: 'ddebee7489203673401bc4663d43695c',
  useIP: true,
  ipAPIKey: '4f7dd6baa8f6db',
  theme: '../climate.json',
  location: 'San Francisco'
};

function refresh() {
  getCurrentLocation(options).then((data) => {
    getWeather(data, options).then((weatherData) => {
      document.getElementById('test').innerHTML = "<b>Weather Data:</b> <br>" + JSON.stringify(weatherData);
    });
  })
}

document.getElementById('btn-ip').addEventListener('click', () => {setOptions('ip')});
document.getElementById('btn-geo').addEventListener('click', () => {setOptions('geolocation')});
document.getElementById('btn-man').addEventListener('click', () => {setOptions('manual')});
document.getElementById('btn-refresh').addEventListener('click', () => {refresh()});

function setOptions(option) {
  if(option === 'ip') {
    options.useIP = true;
    options.userLocation = true;
  }
  else if(option === 'geolocation') {
    options.useIP = false;
    options.userLocation = true;
  }
  else {
    options.userLocation = false;
  }
}
