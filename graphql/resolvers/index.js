const ledResolver = require("./led");
const temperatureResolver = require("./temperature");
const RGBResolver = require("./rgbColor");
const humidityResolver = require('./humidity');
const modbusResolver = require('./modbus');

const rootResolver = {
   ...ledResolver,
   ...RGBResolver,
   ...temperatureResolver,
   ...humidityResolver,
   ...modbusResolver
};

module.exports = rootResolver;
