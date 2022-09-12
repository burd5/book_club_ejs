const Books = require('../models/Books')

module.exports = {
    getIndex: (req,res)=>{
        res.render('login.ejs')
    },
    getCommunity: (req,res) =>{
        const bookItems = Books.find({userId:req.user.id})
        res.render('community.ejs', {books: bookItems})
    },
    getFavorites: (req,res) =>{
        const bookItems = Books.find({userId:req.user.id})
        res.render('favorites.ejs', {books: bookItems})
    },
    getDashboard: (req,res) =>{
        const bookItems = Books.find({user: req.user.id})
        res.render('dashboard.ejs', {books: bookItems, userName: req.user.userName})
    },
    getReadingList: (req,res) =>{
        const bookItems = Books.find({userId:req.user.id})
        res.render('readingList.ejs', {user: req.user.id, userName: req.user.userName, books: bookItems})
    },
    getFriends: (req,res) =>{
        res.render('friends.ejs', {user: req.user.id, userName: req.user.userName})
    },
    getBookForm: (req,res) => {
        res.render('add.ejs')
    }
}