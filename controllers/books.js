const Books = require('../models/Books')
const User = require('../models/User')

// Methods - routed from books.js
module.exports = {
    // Renders dashboard from header
    getBooks: async (req,res)=>{
        try{
            const bookItems = await Books.find({user:req.books.user})
            res.render('dashboard.ejs', {books: bookItems, userId: req.user.id, userName: req.user.userName})
        }catch(err){
            console.log(err)
        }
    },
    // Adds new book to completed ('dashboard') from add.ejs form
    addBook: async (req, res)=>{
    
        try{
            await Books.create({title: req.body.title, author: req.body.author, rating: req.body.rating, user: req.user.id})
            console.log('Book has been added!')
            res.redirect('../dashboard')
        }catch(err){
            console.log(err)
        }
    },
    // Adds new book to reading list ('readingList.ejs') from add.ejs form
    addReading: async (req, res)=>{
        try{
            await Books.create({title: req.body.title, author: req.body.author, rating: req.body.rating, user: req.user.id, completed: false})
            console.log('Book has been added!')
            res.redirect('../readingList')
        }catch(err){
            console.log(err)
        }
    },
    // Removes book from favorites ('favorites.ejs')
    unFavorite: async (req,res) => {
        try{
            await Books.findOneAndUpdate({_id:req.params.id},{
                favorite: false
            })
            console.log('Marked unFavorite')
            res.redirect('/favorites')
        }catch(err){
            console.log(err)
        }
    },
    // Marks book from reading list ('reading.ejs') as complete
    markComplete: async (req, res)=>{
        try{
            await Books.findOneAndUpdate({_id:req.params.id},{
                completed: true
            })
            res.redirect('/readingList')
            console.log('Marked Complete')
        }catch(err){
            console.log(err)
        }
    },
    // Marks book from dashboard as favorite (added to 'favorites.ejs')
    markFavorite: async (req,res) => {
        try{
            await Books.findOneAndUpdate({_id:req.params.id},{
                favorite: true
            })
            console.log('Marked Favorite')
            res.redirect('/dashboard')
        }catch(err){
            console.log(err)
        }
    },
    // Removes book from 'dashboard.ejs' 
    deleteBook: async (req, res)=>{
        try{
            //Find book by id
            await Books.findOneAndDelete({_id:req.params.id})
            console.log('Deleted Book')
            res.redirect('/dashboard')
        }catch(err){
            console.log(err)
        }
    },
    // Removes book from 'readingList.ejs'
    deleteFromReadingList: async (req, res)=>{
        try{
            //Find book by id
            await Books.findOneAndDelete({_id:req.params.id})
            console.log('Deleted Book')
            res.redirect('/readingList')
        }catch(err){
            console.log(err)
        }
    },
    // Follows other user from 'friends.ejs'
    addFriend: async (req,res) =>{
        try {
            await User.findOneAndUpdate({_id: req.user.id}, 
                {$addToSet: {friends: req.params.id}})
            console.log('Added Friend')
            res.redirect('/friends')
        } catch (err) {
            console.log(err)
        }
    },
    // Removes follower from 'friends.ejs'
    removeFriend: async (req,res) =>{
        try {
            await User.findOneAndUpdate({_id: req.user.id}, 
                {$pull: {friends: req.params.id}})
            console.log('Deleted Friend')
            res.redirect('/friends')
        } catch (err) {
            console.log(err)
        }
    },
    // Adds rating to books that were originally added to 'readingList.ejs'
    addRating: async (req,res) =>{
        try {
            await Books.findOneAndUpdate({_id:req.params.id}, {
                rating: req.params.rating
            })
            console.log('Added Rating')
            res.redirect('/readingList')
        } catch (err) {
            console.log(err)
        }
    }
}    