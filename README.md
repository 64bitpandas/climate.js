# Climate.js

[![Build Status](https://travis-ci.org/dbqeo/climate.js.svg?branch=master)](https://travis-ci.org/dbqeo/climate.js)
[![](https://img.shields.io/badge/license-MIT-red.svg)](https://github.com/dbqeo/climate.js)


Insert screenshot here


Climate.js takes raw weather data and offers a variety of customizable color schemes and visualizers to reflect the current weather. Add extra flair to location-based webapps, or perhaps give a homey feel with weather from your hometown- anything to help make your site more responsive :)

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

This config will manually set the city to San Francisco, and update the color scheme every minute based on the type of weather (e.g. sunny or rainy). More config options can be found in [Options](#options).

3. Create your divs.

```html
<div class="climate-[indicator]">Content</div>
```

Replace `[indicator]` with your custom indicator as specified in `climate.json`. For example:

```json
{
  "weather": {
    "sunny": {
      "primary": "#FFFFFF"
    }
    ...
  }
}
```
will use the `climate-primary` class. You may add as many indicators as you wish, as long as all of your weather patterns have the same indicators.

4. Create `climate.json`. A default config is provided [here](https://github.com/dbqeo/climate.js/blob/master/examples/climate.json) if you want to get up and running ASAP. If you're too good for the default and want to make your own theme, go to [Custom Theming](#custom-theming).

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

**Top-level Fields**

In terms of priority, sun > weather > temperature.

All indicators (e.g. `primary` or `sky`) are fully customizable and can be whatever you wish, as long as they are consistent throughout each weather pattern.

A default config for reference is provided [here](https://github.com/dbqeo/climate.js/blob/master/examples/climate.json)

| Field       	| Description                                                                                                                                                                                                                                                                                                                                             	| 
|-------------	|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------	|----------------------	|
| defaults    	| Specifies the default weather/temperature if an unconfigured weather pattern appears.                                                                                                                                                                                                                                                                   	
| use         	| Specifies what OpenWeatherMap parameter to use for differentiating weather patterns. Valid inputs are `id`, `main`, and `description` for weather; `temp`, `pressure`, `humidity`, `temp_min`, or `temp_max` for temperature. See the [OpenWeatherMap API list](https://openweathermap.org/weather-conditions) for more info.                           	
| weather     	| Specifies color themes for weather patterns, using the specified parameter from `use.weather`. See the [OpenWeatherMap API list](https://openweathermap.org/weather-conditions) for valid parameters.                                                                                                                                                   
| temperature 	| Specifies color themes for temperature ranges, using the specified parameter from `use.weather`. See the [OpenWeatherMap API list](https://openweathermap.org/weather-conditions) for valid parameters. Specify `min` and `max` temperature values inside each self-labeled temperature range. Also specify `units` (either `Fahrenheit` or `Celsius`). 	
| sun         	| Two parameters: `rise` and `set`, corresponding to sunrise and sunset colors. Specify `timeRange` which is the time, in minutes, before and after sunset/rise time to display sunset colors.                                                                                                                                                            	


## Future Features
 - Seasons
 - Sunset/sunrise gradient skies
 - MOAR CUSTOMIZATION
 - Want something else? [Create an issue](https://github.com/dbqeo/climate.js/issues/new)!
