const Energy = require('../models/Energy');

module.exports = {
    trendEnergy: async (args) => {
        try {
            const energy = await Energy.find();

            return energy.map(ener => {
                return {
                    ...ener._doc,
                    energy: ener.energy,
                    power: ener.power,
                    date: ener.date
                };
            });
        } catch (err) {
            throw err;
        }
    },
    saveEnergy: async (args) => {
        try {

            const energy = new Energy({
                energy: args.energy,
                power: args.power,
                date: args.date
            });

            energy.save();

            return energy;

        } catch (err) {
            throw err;
        }
    }
}