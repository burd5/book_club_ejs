const mongoose = require('mongoose')

const BookSchema = new mongoose.Schema({
    title: {
        type: String,
        trim: true,
    },
    author: {
        type: String,
    },
    rating: {
        type: Number,
    },
    // References User model through user.id
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    favorite: {
        type: Boolean,
        default: false,
    },
    completed: {
        type: Boolean,
        default: true,
    }
})

module.exports = mongoose.model('Books', BookSchema)
