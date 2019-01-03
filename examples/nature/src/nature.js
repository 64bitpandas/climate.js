/**
 * Nature.js example
 * Allows user to manually switch between color schemes, displaying
 * results on a minimalistic nature scene.
 */

 import initClimate from '../../../src/climate';

 /**
  * Map this function to the weather switcher buttons.
  * Calls setTheme() with custom weather options.
  * @param {string} pattern Name of weather pattern (e.g. 'Clear').
  * 'detect' is used to signify that the user's location will be used.
  */
 function switchTo(pattern) {

  let defaultOptions = {
    userLocation: false,
    weatherAPIKey: 'ddebee7489203673401bc4663d43695c',
    useIP: true,
    ipAPIKey: '4f7dd6baa8f6db',
    theme: '../climate.json',
  }

  if(pattern === 'detect')
    defaultOptions;
 }
