/**
 * Nature.js example
 * Allows user to manually switch between color schemes, displaying
 * results on a minimalistic nature scene.
 */

import * as climate from '../../../src/climate';

let options = {
  userLocation: true,
  weatherAPIKey: 'ddebee7489203673401bc4663d43695c',
  useIP: true,
  ipAPIKey: '4f7dd6baa8f6db',
  theme: '../climate.json',
};

climate.initClimate(options);

climate.getCurrentLocation(options).then((data) => {
  console.log(data);
  climate.getWeather(data, options).then((weatherData) => {
    console.log(weatherData);
    document.getElementById('title').innerHTML = "<b>Weather Data:</b> <br>" + JSON.stringify(weatherData);
  });
});
