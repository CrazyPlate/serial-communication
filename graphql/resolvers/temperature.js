const sensor = require('ds18b20-raspi');

module.exports = {
    temperature: async () => {
        const tempC = sensor.readSimpleC(2);
        const list = sensor.list();

        return {
            temperature: tempC,
            ds18b20Id: list
        }
    }
}