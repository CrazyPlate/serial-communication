const ledResolver = require("./led");
const temperatureResolver = require("./temperature");
const RGBResolver = require("./rgbColor");
const humidityResolver = require('./humidity');

const rootResolver = {
   ...ledResolver,
   ...RGBResolver,
   ...temperatureResolver,
   ...humidityResolver
};

module.exports = rootResolver;
