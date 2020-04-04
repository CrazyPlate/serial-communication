const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const humiditySchema = new Schema({
    humidity: {
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

module.exports = mongoose.model("Humidity", humiditySchema);
