import { assert } from 'chai';
import * as climate from '../dist/climate';

// describe('Awesome test.', () => {
//   it('should test default awesome function', () => {
//     const expectedVal = 'I am the Default Awesome Function, fellow comrade! - Dinesh'
//     assert(defaultAwesomeFunction('Dinesh') === expectedVal, 'Default not awesome :(');
//   });

//   it('should test awesome function', () => {
//     const expectedVal = 'I am just an Awesome Function'
//     assert(awesomeFunction() === expectedVal, 'Named awesome :(');
//   });
// });


const options = {
  userLocation: false,
  location: 'San Jose',
  weatherAPIKey: 'ddebee7489203673401bc4663d43695c',
  useIP: true,
  ipAPIKey: '4f7dd6baa8f6db',
  theme: '../climate.json',
}

describe('Climate.js test', () => {
  // it('should test getWeather', () => {
  //   assert(getWeather('San Francisco', options).name === 'San Francisco');
  // })

  // it('should test getLatLong', () => {
  //   assert(
  //     !isNaN(climate.getLatLong(options).coords.latitude) &&
  //     !isNaN(climate.getLatLong(options).coords.longitude));
  // })

  it('should test kelvin to celsius', () => {
    const expected = 100;
    assert(climate.convertFromKelvin('celsius', 373.15) === expected);
  })

  it('should test kelvin to fahrenheit', () => {
    const expected = 80.6;
    assert(climate.convertFromKelvin('fahrenheit', 300.15) === expected);
  })
})
