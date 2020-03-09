const ledResolver = require("./led");
const temperatureResolver = require("./temperature");
const RGBResolver = require("./rgbColor");

const rootResolver = {
   ...ledResolver,
   ...RGBResolver,
   ...temperatureResolver
};

module.exports = rootResolver;
