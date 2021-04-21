var path = require('path');
var dotenv = require('dotenv');

var results = dotenv.config({
    path: path.resolve(process.cwd(), '.env')
});

module.exports = results.parsed;