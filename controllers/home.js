const Books = require('../models/Books')
const User = require('../models/User')

module.exports = {
    getIndex: (req,res)=>{
        res.render('login.ejs')
    },
    getCommunity: async (req,res) =>{
        const bookItems = await Books.find().sort({createdAt: -1})
        res.render('community.ejs', {books: bookItems, user: req.user.id})
    },
    getFavorites: async (req,res) =>{
        const bookItems = await Books.find({user: req.user.id})
        res.render('favorites.ejs', {books: bookItems, user: req.user.id})
    },
    getDashboard: async (req,res) =>{
        const bookItems = await Books.find({user: req.user.id}).sort({rating: -1})
        res.render('dashboard.ejs', {books: bookItems, user: req.user.id, userName: req.user.userName})
    },
    getReadingList: async (req,res) =>{
        const bookItems = await Books.find({userId:req.user.id})
        res.render('readingList.ejs', {user: req.user.id, userName: req.user.userName, books: bookItems})
    },
    getFriends: async (req,res) =>{
        const userItems = await User.find({user: req.id})
        res.render('friends.ejs', {user: userItems, userName: req.user.userName})
    },
    getProfile: async (req,res) =>{
        const userItems = await User.find({user: req.id})
        const bookItems = await Books.find({userId:req.user.id})
        res.render('profile.ejs', {user: userItems, userName: req.user.userName, books: bookItems})
    },
    getBookForm: (req,res) => {
        res.render('add.ejs')
    }
}