const Books = require('../models/Books')

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
    markComplete: async (req, res)=>{
        try{
            await Books.findOneAndUpdate({_id:req.body.bookIdFromJSFile},{
                completed: true
            })
            console.log('Marked Complete')
            res.json('Marked Complete')
        }catch(err){
            console.log(err)
        }
    },
    markIncomplete: async (req, res)=>{
        try{
            await Books.findOneAndUpdate({_id:req.body.bookIdFromJSFile},{
                completed: false
            })
            console.log('Marked Incomplete')
            res.json('Marked Incomplete')
        }catch(err){
            console.log(err)
        }
    },
    deleteBook: async (req, res)=>{
        console.log(req.body.bookIdFromJSFile)
        try{
            await Books.findOneAndDelete({_id:req.body.bookIdFromJSFile})
            console.log('Deleted Book')
            res.json('Deleted It')
        }catch(err){
            console.log(err)
        }
    }
}    