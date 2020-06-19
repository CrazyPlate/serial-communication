const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const energySchema = new Schema({
    energy: {
        type: String,
        required: true
    },
    power: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    }
},
    {
        timestamps: false
    });

module.exports = mongoose.model("Energy", energySchema);
