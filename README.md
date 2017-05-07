# weather-app
a node based project that uses the api from http://api.openweathermap.org to check weather based on city or zip

To use the app, users will need to create an api.json file and supply an openweathermap.org API key that uniquely identifies
his or her account. For example, the api.json would have the following structure:

{
  "key": "123456789abcdefgh"
}

Run the application using node at the command line, supplying either "zip" or "city" with the appropriate value following.
For example, to query the weather in Winchester, VA, you could enter either:

node app.js zip 22601

OR

node app.js city Winchester

There is certainly more than one city in the world named Winchester, so how does it differentiate between those? Well, at the
moment it doesn't. This is an issue that needs to be resolved as I find time to flesh out the app. It was built for a
treehouse course.
