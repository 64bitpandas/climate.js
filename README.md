# Climate.js

[![Build Status](https://travis-ci.org/dbqeo/climate.js.svg?branch=master)](https://travis-ci.org/dbqeo/climate.js)
[![](https://img.shields.io/badge/license-MIT-red.svg)](https://github.com/dbqeo/climate.js)


![Climate Banner](climate-banner.png)

Climate.js takes raw weather data and offers a variety of customizable color schemes and visualizers to reflect the current weather. Add extra flair to location-based webapps, or perhaps give a homey feel with weather from your hometown- anything to help make your site more responsive :)

## What's new in 1.1

 - Climate.js is now built for standalone use! The usage of `<script>` tags has changed to match the module usage (e.g. `climate.initClimate()` instead of `initClimate()`). See [Usage](#usage) for more information.
 - Toggle Mode: Instead of the usual 'color' mode, you can opt to show/hide elements based on the current weather.

## Features
 - Weather data collection (local or manual) from OpenWeatherMap
 - Get rough user location without prompt using ipinfo
 - Set custom configurations for class names, colors, and weather sets
 - Run once or at a specified interval
 - No dependencies!

## Coming Soon
 - Seasons
 - Sunset/sunrise gradient skies
 - Wind/rain/snow effects
 - MOAR CUSTOMIZATION
 - Want something else? [Create an issue](https://github.com/dbqeo/climate.js/issues/new)!

## Install

**NPM**: https://npm.js/package/climate.js `npm install --save climate.js`

**Download**: [Get the latest version here!](https://github.com/dbqeo/climate.js/releases/latest)

**CDN**: Coming Soon!

## Usage

**IMPORTANT NOTE**: `climate.min.js` is a *standalone* module for use in default environments. If you're using babel/browserify/webpack, import from `climate.js` instead.

1. Include the script using your preferred method:

**Script Tag**
```html
<script src="./path/to/climate.min.js"></script>
```

**Require**
```javascript
const climate = require('climate.js');
```

**es6**
```javascript
import * as climate from 'climate.js';
```

2. Initialize the script.

If `userLocation` is set to `true`, the user will be prompted for location permissions when `initClimate()` is run. **Note:** Requires a web browser to access geolocation tools!

If `userLocation` is set to `false`, the `location` parameter is required.

```javascript
climate.initClimate({
    theme: 'path/to/climate.json',
    userLocation: false,
    location: 'San Francisco',
    interval: 6000,
    mode: 'weather',
    weatherAPIKey: 'insertyourkeyherefromopenweatherapi'
})
```

This config will manually set the city to San Francisco, and update the color scheme every minute based on the type of weather (e.g. sunny or rainy). More config options can be found in [Options](#options).

3. Create your divs.

**Color Mode:** Changes div colors based on weather.

```html
<div class="climate-[indicator]">Content</div>
```

Replace `[indicator]` with your custom indicator as specified in `climate.json`. For example:

```json
{
  "weather": {
    "clear": {
      "primary": "#FFFFFF"
    }
    ...
  }
}
```
will use the `climate-primary` class. You may add as many indicators as you wish, as long as all of your weather patterns have the same indicators.

**Toggle Mode:** Will show or hide divs based on the weather.

```html
<div class="climate-toggle climate-clear">Content</div>
<div class="climate-toggle climate-clouds">More Content</div>
```

In the above example, if the weather is currently clear, only the top div will be visible.

Toggle mode can also be used for temperatures, if specified (e.g. `climate-cold`).


4. Create `climate.json`. A default config is provided [here](https://github.com/dbqeo/climate.js/blob/master/examples/climate.json) if you want to get up and running ASAP. If you're too good for the default and want to make your own theme, go to [Custom Theming](#custom-theming).

## Run Example Code

Examples are provided in the `examples` folder. In order to run them, clone this repository, `npm install`, then `npm run example:<exampleName>` where <exampleName> is replaced by the name of the example (e.g. `nature`).

## Options

| Option        	| Description                                                                                                                                                                                                                                                                  	| Default         	|
|---------------	|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------	|-----------------	|
| theme         	| Path to your climate.json theme configuration. (Get the default config [here](#))                                                                                                                                                                                            	| null            	|
| weatherAPIKey 	| API key to openweathermap. REQUIRED for use!                                                                                                                                                                                                                                 	| null            	|
| userLocation  	| True if you wish to use the user's location; false if you want to use your own location.                                                                                                                                                                                     	| false           	|
| location      	| Default location (name of city). Required if `userLocation` is false, but it is also highly recommended as a fallback.                                                                                                                                                       	| 'San Francisco' 	|
| useIP         	| If true, uses ipinfo.io to get the user's location without needing to prompt for location permission. Requires API key.                                                                                                                                                      	| false           	|
| ipAPIKey      	| API key to ipinfo.io. Not required unless `useIP` and `userLocation` are both true.                                                                                                                                                                                          	| null            	|
| interval      	| Interval, in milliseconds, between each weather fetch. Set to 0 to only fetch once.                                                                                                                                                                                          	| 0               	|
| mode          	| `color` mode changes the color of the elements, while `toggle` mode will show an element only if the weather pattern matches. | 'color'       	|

## Custom Theming

**Top-level Fields**

In terms of priority, sun > weather > temperature.

All indicators (e.g. `primary` or `sky`) are fully customizable and can be whatever you wish, as long as they are consistent throughout each weather pattern.

A default config for reference is provided [here](https://github.com/dbqeo/climate.js/blob/master/examples/climate.json)

| Field       	| Description                                                                                                                                                                                                                                                                                                                                             	|
|-------------	|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------	|
| defaults    	| Specifies the default weather/temperature if an unconfigured weather pattern appears.                                                                                                                                                                                                                                                                   	|
| use         	| Specifies what OpenWeatherMap parameter to use for differentiating weather patterns. Valid inputs are `id`, `main`, and `description` for weather; `temp`, `pressure`, `humidity`, `temp_min`, or `temp_max` for temperature. See the [OpenWeatherMap API list](https://openweathermap.org/weather-conditions) for more info.                            	|
| weather     	| Specifies color themes for weather patterns, using the specified parameter from `use.weather`. See the [OpenWeatherMap API list](https://openweathermap.org/weather-conditions) for valid parameters.                                                                                                                                               	|
| temperature 	| Specifies color themes for temperature ranges, using the specified parameter from `use.weather`. See the [OpenWeatherMap API list](https://openweathermap.org/weather-conditions) for valid parameters. Specify `min` and `max` temperature values inside each self-labeled temperature range. Also specify `units` (either `Fahrenheit` or `Celsius`). If temperature styles are given, they will be used over weather pattern styles.	|
| sun         	| Two parameters: `rise` and `set`, corresponding to sunrise and sunset colors. Specify `timeRange` which is the time, in minutes, before and after sunset/rise time to display sunset colors.                                                                                                                                                            	|                            
