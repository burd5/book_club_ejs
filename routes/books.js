const express = require('express')
const router = express.Router()
const booksController = require('../controllers/books') 
const { ensureAuth, ensureGuest } = require('../middleware/auth')

router.get('/getBooks', ensureAuth, booksController.getBooks)

router.post('/addBook', booksController.addBook)

router.put('/markComplete', booksController.markComplete)

router.put('/markIncomplete', booksController.markIncomplete)

router.delete('/deleteBook', booksController.deleteBook)

module.exports = router