const weather = require('./weather.js');
const type = process.argv[2];
const query = process.argv.slice(3).join();

weather.get(type, query);