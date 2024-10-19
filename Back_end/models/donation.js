const mongoose = require('mongoose');
const donationSchema = new mongoose.Schema({
    tree: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user', // Reference to User model
        required: true
    }
}, { timestamps: true });

const Donation = mongoose.model('donation', donationSchema);
module.exports = Donation;