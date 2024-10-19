const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user', // Reference to User model
        required: true
    },
    trees: [{
        treeId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'trees' // Reference to Tree model
        },
        quantity: {
            type: Number,
            default: 1
        }
    }]
}, { timestamps: true, collection: 'cart' }); // Specify the collection name here

const Cart = mongoose.model('Cart', cartSchema); // Use capitalized model name for convention
module.exports = Cart;