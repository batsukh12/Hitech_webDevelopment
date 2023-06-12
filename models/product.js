const mongoose = require('mongoose')
const Schema = mongoose.Schema
const productSchema = new Schema({
    name: {
        type: 'string',
        required: true,
        unique: true,
    },
    subCatId: {
        type: 'string',
        required: true,
    },
    price: {
        type: 'number',
        required: true,
    },
    description: {
        type: 'string',
        required: true,
    },
    count: {
        type: 'number',
        required: true,
    },
    photos: [
        {
          type: Schema.Types.ObjectId,
          ref: 'Photo',
        },
    ],
    createdAt: {
        type: Date,
        default: new Date(),
    },

});

const product = mongoose.model('product', productSchema);
module.exports = product;