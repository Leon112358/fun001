const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// define the schema and create a model for a piece of document.
const Xiaoliuren = mongoose.model(
    "Xiaoliuren", 
    new Schema({
        result: {
            type: Number,
            required: true
        },
        lunar_time: {
            type: Object,
            required: true
        }
    }, {timestamps: true})
);

// export the model
module.exports = Xiaoliuren;