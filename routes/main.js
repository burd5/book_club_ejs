const express = require('express')
const router = express.Router()
const authController = require('../controllers/auth') 
const homeController = require('../controllers/home')
const { ensureAuth, ensureGuest } = require('../middleware/auth')

router.get('/', homeController.getIndex)
router.get('/dashboard', homeController.getDashboard)
router.get('/community', homeController.getCommunity)
router.get('/favorites', homeController.getFavorites)
router.get('/readingList', homeController.getReadingList)
router.get('/friends', homeController.getFriends)
router.get('/bookForm', homeController.getBookForm)
router.post('/login', authController.postLogin)
router.get('/logout', authController.logout)
router.get('/signup', authController.getSignup)
router.post('/signup', authController.postSignup)

module.exports = router