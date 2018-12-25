/**
 * Example that requests the user's current location and
 * adapts the color scheme to fit the user's weather.
 */

import initClimate from '../../../src/climate';

initClimate({
  userLocation: true,
  weatherAPIKey: 'ddebee7489203673401bc4663d43695c'
});
