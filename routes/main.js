const express = require('express')
const router = express.Router()
const upload = require("../middleware/multer");
const authController = require('../controllers/auth') 
const homeController = require('../controllers/home')

router.get('/', homeController.getIndex)
router.get('/dashboard', homeController.getDashboard)
router.get('/profile/:id', homeController.getProfile)
router.get('/profile', homeController.getUserProfile)
router.get('/community', homeController.getCommunity)
router.get('/favorites', homeController.getFavorites)
router.get('/readingList', homeController.getReadingList)
router.get('/friends', homeController.getFriends)
router.get('/bookForm', homeController.getBookForm)
router.post('/login', authController.postLogin)
router.get('/logout', authController.logout)
router.get('/signup', authController.getSignup)
router.post('/signup', authController.postSignup)
router.put('/addProfileImg', upload.single("file"), homeController.addImg)


module.exports = router