const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var request = new Schema({
    username: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
        unique: true
    },
    amount: {
        type: String,
        required: true
    },
    bloodGroup: {
        type: String,
        required: true
    }
    // requisitionform: {
    //     type: String,
    //     required: true
    // }
}, {
    timestamps: true,
})

module.exports = mongoose.model('request', request);