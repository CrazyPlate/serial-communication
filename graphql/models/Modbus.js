const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const modbusSchema = new Schema({
    register: {
        type: String,
        required: true
    },
    data: {
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

module.exports = mongoose.model("Modbus", modbusSchema);
