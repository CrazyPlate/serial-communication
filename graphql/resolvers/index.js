const ledResolver = require("./led");
const temperatureResolver = require("./temperature");

const rootResolver = {
   ...ledResolver,
   ...temperatureResolver
};

module.exports = rootResolver;
