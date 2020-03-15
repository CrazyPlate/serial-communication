const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const temperatureSchema = new Schema({
    temperature: {
        type: String,
        required: true
    },
    ds18b20Id: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    }
},
    {
        timestamps: true
    });

module.exports = mongoose.model("Temperature", temperatureSchema);
