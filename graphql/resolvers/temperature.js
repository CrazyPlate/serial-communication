const sensor = require('ds18b20-raspi');
const Temperature = require('../models/Temperature');

module.exports = {
    currentTemperature: (args) => {
        try {
            const tempC = sensor.readSimpleC(2);
            const list = sensor.list();

            return {
                temperature: tempC,
                ds18b20Id: list[0],
                date: new Date().toISOString()
            }
        } catch (err) {
            throw err;
        }
    },
    trendTemps: async (args) => {
        try {
            const temps = await Temperature.find();

            return temps.map(temp => {
                return {
                    ...temp._doc,
                    temperature: temp.temperature,
                    ds18b20Id: temp.ds18b20Id,
                    date: temp.date
                };
            });
        } catch (err) {
            throw err;
        }
    }
}