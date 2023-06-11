<<<<<<< HEAD
const mongoose = require('mongoose')
const Schema = mongoose.Schema
const subCategorySchema = new Schema({
    subCatName: {
        type: 'string',
        required: true,
        unique: true,
    },
    parentId: {
        type: 'string',
        required: true,
        unique: true,
    },
    createdAt: {
        type: Date,
        default: new Date(),
    },
});

const subcategory = mongoose.model('subcategory', subCategorySchema);
=======
const mongoose = require('mongoose')
const Schema = mongoose.Schema
const subCategorySchema = new Schema({
    subCatName: {
        type: 'string',
        required: true,
        unique: true,
    },
    parentId: {
        type: 'string',
        required: true,
        unique: true,
    },
    createdAt: {
        type: Date,
        default: new Date(),
    },
});

const subcategory = mongoose.model('subcategory', subCategorySchema);
>>>>>>> 8bf766bc18eea96dde63f1efab934f9f83203263
module.exports = subcategory;