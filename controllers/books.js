const Books = require('../models/Books')
const User = require('../models/User')

module.exports = {
    getBooks: async (req,res)=>{
        try{
            const bookItems = await Books.find({user:req.books.user})
            res.render('dashboard.ejs', {books: bookItems, userId: req.user.id, userName: req.user.userName})
        }catch(err){
            console.log(err)
        }
    },
    addBook: async (req, res)=>{
    
        try{
            await Books.create({title: req.body.title, author: req.body.author, rating: req.body.rating, user: req.user.id})
            console.log('Book has been added!')
            res.redirect('../dashboard')
        }catch(err){
            console.log(err)
        }
    },
    addReading: async (req, res)=>{
        try{
            await Books.create({title: req.body.title, author: req.body.author, rating: req.body.rating, user: req.user.id, completed: false})
            console.log('Book has been added!')
            res.redirect('../readingList')
        }catch(err){
            console.log(err)
        }
    },
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
    addFriend: async (req,res) =>{
        try {
            await User.findOneAndUpdate({_id: req.params.id}, 
                {$addToSet: {friends: req.user.id}})
            console.log('Added Friend')
            res.redirect('/friends')
        } catch (err) {
            console.log(err)
        }
    },
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