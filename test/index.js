import { assert } from 'chai';
import initClimate, { getWeather, getLatLong, convertFromKelvin } from '../src/climate';

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
  userLocation: true,
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
  //     !isNaN(getLatLong(options).coords.latitude) &&
  //     !isNaN(getLatLong(options).coords.longitude));
  // })

  it('should test kelvin to celsius', () => {
    const expected = 100;
    assert(convertFromKelvin('celsius', 373.15));
  })

  it('should test kelvin to fahrenheit', () => {
    const expected = 80.6;
    assert(convertFromKelvin('fahrenheit', 300.15));
  })
})
