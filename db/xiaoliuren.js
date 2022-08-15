const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const dbUrl = "mongodb+srv://tellafortune:z6FmFw1yKmIhRR8b@leon001.hsdpbay.mongodb.net/decisions?retryWrites=true&w=majority";

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
module.exports = {Xiaoliuren, dbUrl};