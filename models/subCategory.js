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
module.exports = subcategory;