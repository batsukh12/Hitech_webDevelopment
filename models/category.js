const mongoose = require('mongoose')
const Schema = mongoose.Schema
const categorySchema = new Schema({
    catName: {
        type: 'string',
        required: true,
        unique: true,
    },
    createdAt: {
        type: Date,
        default: new Date(),
    },
});

const category = mongoose.model('category', categorySchema);
module.exports = category;