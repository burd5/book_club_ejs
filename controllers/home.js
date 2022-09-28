const Books = require('../models/Books')
const cloudinary = require("../middleware/cloudinary");
const User = require('../models/User')

// Methods - routed from main.js
module.exports = {
    // Renders login page
    getIndex: (req,res)=>{
        try {
            res.render('login.ejs')
        } catch (err) {
            console.log(err)
        }
    },
    // Renders 'community.ejs' (Community Feed)
    getCommunity: async (req,res) =>{
        try {
            const bookItems = await Books.find().lean().sort({createdAt: -1}).populate({path: 'user', select: 'userName'})
            res.render('community.ejs', {books: bookItems, userName: req.user.userName, user: req.user.id, userId: req.user._id})
        } catch (err) {
            console.log(err)
        }
    },
    // Renders 'favorites.ejs' (Favorites)
    getFavorites: async (req,res) =>{
        try {
            const bookItems = await Books.find({user: req.user.id})
            const favorites = await Books.find({user: req.user.id, favorite: true})
            res.render('favorites.ejs', {books: bookItems, user: req.user.id, favorites: favorites})
        } catch (error) {
            console.log(err)
        }
    },
    // Renders 'dashboard.ejs' (Dashboard)
    getDashboard: async (req,res) =>{
        try {
            const bookItems = await Books.find({user: req.user.id}).sort({rating: -1})
            const booksRead = await Books.find({user: req.user.id, completed: true})
            res.render('dashboard.ejs', {books: bookItems, user: req.user.id, userName: req.user.userName, booksRead: booksRead})
        } catch (err) {
            console.log(err)
        }
    },
    // Renders 'readingList.ejs' (Reading List)
    getReadingList: async (req,res) =>{
        try {
            const bookItems = await Books.find({user: req.user.id})
            const booksRead = await Books.find({user: req.user.id, completed: false})
            res.render('readingList.ejs', {user: req.user.id, userName: req.user.userName, books: bookItems, booksRead: booksRead})
        } catch (err) {
            console.log(err)
        }
    },
    // Renders 'friends.ejs' (Friends)
    getFriends: async (req,res) =>{
        try {
            const userItems = await User.find({_id: { $ne: req.user.id}})
            let user = await User.findById({_id: req.user.id}).populate({path: 'friends', select: 'userName'})
            const arr = user.friends.map(friend => friend._id)
            res.render('friends.ejs', {user: userItems, friendArr: arr, friends: user.friends, userName: req.user.names})
        } catch (err) {
            console.log(err)
        }
    },
    // Renders 'profile.ejs' from Community Feed ('community.ejs')
    getProfile: async (req,res) =>{
        try {
            const userItems = await User.findById(req.params.id)
            const bookItems = await Books.find({user: req.params.id})
            let user = await User.findById({_id: req.params.id}).populate({path: 'friends', select: 'userName'})
            res.render('profile.ejs', {books: bookItems, userName: req.user.names, user: userItems, userId: req.user._id, friends: user.friends})
        } catch (err) {
            console.log(err)
        }
    },
    // Renders current users profile ('profile.ejs') from header
    getUserProfile: async (req,res) =>{
        try {
            const userItems = await User.findById(req.user.id)
            const bookItems = await Books.find({user: req.user.id})
            let user = await User.findById({_id: req.user.id}).populate({path: 'friends', select: 'userName'})
            res.render('profile.ejs', {books: bookItems, userName: req.user.names, user: userItems, userId: req.user._id, friends: user.friends})
        } catch (err) {
            console.log(err)
        }
    },
    // Renders 'add.ejs' from floating button
    getBookForm: (req,res) => {
        try {
            res.render('add.ejs')
        } catch (err) {
            console.log(err)
        }
    },
    // Adds image from 'profile.ejs' 
    addImg: async (req,res) => {
        try {
            const result = await cloudinary.uploader.upload(req.file.path);
            await User.findByIdAndUpdate({_id: req.user.id},{
                img: result.secure_url,
                cloudinaryId: result.public_id,
            })
            res.redirect('profile')
        } catch (err) {
            console.log(err)
        }
    }
}