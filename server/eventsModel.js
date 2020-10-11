const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const eventSchema = new Schema({
    user:{
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    start:{
        type: Date,
        required: true
    },
    end: {
        type:Date
    }
});


module.exports = mongoose.model('Evento',eventSchema);