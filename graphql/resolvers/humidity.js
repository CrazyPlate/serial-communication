var sensorLib = require("node-dht-sensor");

module.exports = {
    currentHumidity: (args) => {
        try {
            const readout = sensorLib.read(11, 17);

            return {
                humidity: readout.humidity.toFixed(2),
                date: new Date().toISOString()
            }
        } catch (err) {
            throw err;
        }
    }
}