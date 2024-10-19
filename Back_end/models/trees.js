const mongoose = require('mongoose');

const treeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    inventory: {
        type: Number,
        required: true
    },
    care: {
        type: [String], // Array of strings
        required: true
    },
    image: {
        type: [String], // Array of strings for image paths
        required: true
    }
}, { timestamps: true }); // Optional: adds createdAt and updatedAt timestamps

const Tree = mongoose.model('trees', treeSchema);

module.exports = Tree;