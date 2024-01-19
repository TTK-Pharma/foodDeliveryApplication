const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    address: {
        type: String
    },
    name: {
        type: String
    },
    phoneno: {
        type: Number
    }
})

module.exports = mongoose.model('userDetails', userSchema, 'userdetails');