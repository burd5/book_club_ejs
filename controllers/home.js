const Books = require('../models/Books')
const User = require('../models/User')

module.exports = {
    getIndex: (req,res)=>{
        try {
            res.render('login.ejs')
        } catch (err) {
            console.log(err)
        }
    },
    getCommunity: async (req,res) =>{
        try {
            const bookItems = await Books.find().lean().sort({createdAt: -1}).populate({path: 'user', select: 'userName'})
            console.log(bookItems)
            res.render('community.ejs', {books: bookItems, userName: req.user.userName, user: req.user.id, userId: req.user._id})
        } catch (err) {
            console.log(err)
        }
    },
    getFavorites: async (req,res) =>{
        try {
            const bookItems = await Books.find({user: req.user.id})
            const favorites = await Books.find({user: req.user.id, favorite: true})
            res.render('favorites.ejs', {books: bookItems, user: req.user.id, favorites: favorites})
        } catch (error) {
            console.log(err)
        }
    },
    getDashboard: async (req,res) =>{
        try {
            const bookItems = await Books.find({user: req.user.id}).sort({rating: -1})
            const booksRead = await Books.find({user: req.user.id, completed: true})
            res.render('dashboard.ejs', {books: bookItems, user: req.user.id, userName: req.user.userName, booksRead: booksRead})
        } catch (err) {
            console.log(err)
        }
    },
    getReadingList: async (req,res) =>{
        try {
            const bookItems = await Books.find({user: req.user.id})
            const booksRead = await Books.find({user: req.user.id, completed: false})
            res.render('readingList.ejs', {user: req.user.id, userName: req.user.userName, books: bookItems, booksRead: booksRead})
        } catch (err) {
            console.log(err)
        }
    },
    getFriends: async (req,res) =>{
        try {
            const userItems = await User.find({_id: { $ne: req.user.id}})
            res.render('friends.ejs', {user: userItems, userName: req.user.userName, friends: req.user.friends})
        } catch (err) {
            console.log(err)
        }
    },
    getProfile: async (req,res) =>{
        try {
            const user = await User.findById(req.params.id).populate({path: 'user', select: 'userName'})
            const bookItems = await Books.find({user: req.params.id})
            res.render('profile.ejs', {books: bookItems, userName: req.user.userName, user: user, userId: req.user._id})
        } catch (err) {
            console.log(err)
        }
    },
    getBookForm: (req,res) => {
        try {
            res.render('add.ejs')
        } catch (err) {
            console.log(err)
        }
    }
}