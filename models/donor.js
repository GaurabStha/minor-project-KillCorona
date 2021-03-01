const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var donorSchema = new Schema({
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
    bloodGroup: {
        type: String,
        required: true
    },
    coronaCured: {
        type: String,
        required: true
    }
}, {
    timestamps: true,
})

module.exports = mongoose.model('donor', donorSchema);