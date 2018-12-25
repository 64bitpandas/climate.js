# Climate.js

[![Build Status](https://travis-ci.org/dbqeo/climate.js.svg?branch=master)](https://travis-ci.org/dbqeo/climate.js)
[![](https://img.shields.io/badge/license-MIT-red.svg)](https://github.com/dbqeo/climate.js)


Insert screenshot here



As an extension to [Weather.js](https://github.com/noazark/weather), Climate.js takes raw weather data and offers a variety of customizable color schemes and visualizers to reflect the current weather. Add extra flair to location-based webapps, or perhaps give a homey feel with weather from your hometown- anything to help make your site more responsive :)

## Install

**NPM**: https://npm.js/package/climate.js (COMING SOON!) `npm install --save climate.js`

**Download**: [Get the latest version here!](https://github.com/dbqeo/climate.js/releases/latest)

**CDN**: Coming Soon!

## Usage

1. Include the script using your preferred method:

**Script Tag**
```html
<script src="./path/to/climate.min.js"></script>
```

**Require**
```javascript
const climate = require('climate.min.js');
```

**es6**
```javascript
import * as climate from 'climate.min.js';
```

For a lighter version without weather effects (like snow and rain), you can alternatively use `climate-noeffects.min.js`.

2. Initialize the script.

If `userLocation` is set to `true`, the user will be prompted for location permissions when `initClimate()` is run. **Note:** Requires a web browser to access geolocation tools!

If `userLocation` is set to `false`, the `location` parameter is required.

```javascript
climate.initClimate({
    theme: 'path/to/climate.json',
    userLocation: false,
    location: 'San Francisco',
    interval: 6000,
    mode: 'weather'
})
```

This config will manually set the city to San Francisco, and update the color scheme every minute based on the type of weather (e.g. sunny or rainy). More configs can be found in [Options](#options).

If you're too good for the default and want to make your own theme, go to [Custom Theming](#custom-theming).

3. Create your divs.

```html
<div class="climate-primary">This is your foreground.</div>
<div class="climate-secondary">This is your background scenery.</div>
<div class="climate-sky">This is the sky.</div>
```

For graphics, here are some aliases:
```html
<div class="climate-grass">Same as foreground.</div>
<div class="climate-trees">This is your background scenery.</div>
<div class="climate-sky">This is the sky.</div>
```

## Options

| Option        	| Description                                                                                                                                                                                                                                                                  	| Default         	|
|---------------	|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------	|-----------------	|
| theme         	| Path to your climate.json theme configuration. (Get the default config [here](#))                                                                                                                                                                                            	| null            	|
| weatherAPIKey 	| API key to openweathermap. REQUIRED for use!                                                                                                                                                                                                                                 	| null            	|
| userLocation  	| True if you wish to use the user's location; false if you want to use your own location.                                                                                                                                                                                     	| false           	|
| location      	| Default location (name of city). Required if `userLocation` is false, but it is also highly recommended as a fallback.                                                                                                                                                       	| 'San Francisco' 	|
| useIP         	| If true, uses ipinfo.io to get the user's location without needing to prompt for location permission. Requires API key.                                                                                                                                                      	| false           	|
| ipAPIKEY      	| API key to ipinfo.io. Not required unless `useIP` and `userLocation` are both true.                                                                                                                                                                                          	| null            	|
| interval      	| Interval, in milliseconds, between each weather fetch. Set to 0 to only fetch once.                                                                                                                                                                                          	| 0               	|
| mode          	| `weather` mode changes themes based on weather (rain, snow, etc.) while `temperature` mode changes themes based on how hot it is. `all` uses both simultaneously. (Remember- you need to specify additional theme configuration if you wish to use `temperature` or `both`!) 	| 'weather'       	|

## Custom Theming

## Future Features
 - Seasons
 - Sunset/sunrise gradient skies
 - MOAR CUSTOMIZATION
 - Want something else? [Create an issue](https://github.com/dbqeo/climate.js/issues/new)!
