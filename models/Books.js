const mongoose = require('mongoose')

const BookSchema = new mongoose.Schema({
    title: {
        type: String,
        trim: true
    },
    author: {
        type: String,
    },
    rating: {
        type: Number,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    userName: {
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
    readingList: {
        type: Boolean,
        default: false,
    }
})

module.exports = mongoose.model('Books', BookSchema)
