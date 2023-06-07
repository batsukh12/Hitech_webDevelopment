const mongoose = require('mongoose')
const Schema = mongoose.Schema
const userSchema = new Schema({
    name: {
        type: 'string',
        required: true,
    },
    email: {
        type: 'string',
        required: true,
    },
    phone: {
        type: 'string',
        required: true,
    },
    password: {
        type: 'string',
        required: true,
    },
    createdAt: {
        type: Date,
        default: new Date(),
    },
});

const User = mongoose.model('User', userSchema);
module.exports = User;