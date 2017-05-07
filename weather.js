const http = require('http');
const api = require('./api.json');
const URL = 'http://api.openweathermap.org/data/2.5/weather';
let string = 'London,uk'

// Print error message 
function printError(error) {
  console.error(error.message);
};

function printMessage(weather) {
  // temp comes in Kelvin
  const fahrenheit = (1.8 * (weather.main.temp - 273) + 32).toFixed(2);
  const message = `
  	The temperature in ${weather.name} is ${fahrenheit}F.
	----
	Sunrise is ${convertUnixTime(weather.sys.sunrise)} and sunset is ${convertUnixTime(weather.sys.sunset)}.
	----
	Today, the skies are ${weather.weather[0].main} and it is ${weather.weather[0].description}.`;
  
	console.log(message);
}

function convertUnixTime(time) {
	return new Date(time * 1000).toString().substring(4, 24);
}

function get(type, query) {
  
  try {
    
    switch(type) {
        case 'city':
          string = `q=${query}`;
          break;
        case 'zip':
          string = `zip=${query}`;
          break;
        default:
          string = `zip=90210`;
    }   
    
    const newURL = `${URL}?${string}&APPID=${api.key}`;
    
    const request = http.get(newURL, response => {
      if (response.statusCode === 200) {
        
        let body = '';
        response.on('data', data => {                    
          body += data.toString();
        }); 
  
        response.on('end', () => {
          try {
            const weather = JSON.parse(body);
              printMessage(weather);
            } catch (e) {
              printError(e);
            }
          });
        } else {
          const message = `There was an error (${http.STATUS_CODES[response.statusCode]}).`;
          const statusCodeError = new Error(message);
          printError(statusCodeError);
        }
    });
  } catch (error) {
    printError(error);
  }

}

module.exports.get = get;