const Modbus = require('../models/Modbus');

module.exports = {
    modbus: async (args) => {
        try {
            const values = await Modbus.find();

            let lastDate = -1;
            let last = null;
            for (let i = 0; i < values.length; i++) {
                if (Number(values[i].date) > lastDate) {
                    lastDate = values[i].date;
                    last = values[i];
                }
            }

            return {
                register: last.register,
                data: last.data,
                date: last.date
            };
        } catch (err) {
            throw err;
        }
    }
}