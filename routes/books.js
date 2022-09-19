const express = require('express')
const router = express.Router()
const booksController = require('../controllers/books') 
const { ensureAuth, ensureGuest } = require('../middleware/auth')

router.get('/getBooks', ensureAuth, booksController.getBooks)

router.post('/addBook', booksController.addBook)

router.put('/addFriend', booksController.addFriend)

router.put('/markFavorite/:id', booksController.markFavorite)

router.put('/markComplete', booksController.markComplete)

router.put('/unFavorite/:id', booksController.unFavorite)

router.put('/markIncomplete', booksController.markIncomplete)

router.delete('/deleteBook/:id', booksController.deleteBook)

module.exports = router