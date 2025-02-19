const express = require('express')
const router = express.Router()
const booksController = require('../controllers/books') 
const { ensureAuth, ensureGuest } = require('../middleware/auth')

router.get('/getBooks', ensureAuth, booksController.getBooks)
router.post('/filter', booksController.filter)
router.post('/addBook', booksController.addBook)
router.post('/addReading', booksController.addReading)
router.post('/addToList/:id', booksController.addToList)
router.put('/addFriend/:id', booksController.addFriend)
router.put('/removeFriend/:id', booksController.removeFriend)
router.put('/addRating/:id', booksController.addRating)
router.put('/markFavorite/:id', booksController.markFavorite)
router.put('/markComplete/:id', booksController.markComplete)
router.put('/unFavorite/:id', booksController.unFavorite)
router.delete('/deleteBook/:id', booksController.deleteBook)
router.delete('/deleteFromReadingList/:id', booksController.deleteFromReadingList)

module.exports = router