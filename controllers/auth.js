const passport = require('passport')
const validator = require('validator')
const User = require('../models/User')
const Books = require('../models/Books')

// Methods - routed from main.js 
module.exports = {
  // Render login page - if logged in, render dashboard
  getLogin: (req, res) => {
    if (req.user) {
      return res.redirect('/dashboard')
    }
    res.render('/login', {
      title: 'Login'
    })
  },
  // Login users with existing account
  postLogin: async (req, res, next) => {
    const validationErrors = []
    if (!validator.isEmail(req.body.email)) validationErrors.push({ msg: 'Please enter a valid email address.' })
    if (validator.isEmpty(req.body.password)) validationErrors.push({ msg: 'Password cannot be blank.' })
  
    if (validationErrors.length) {
      req.flash('errors', validationErrors)
      return res.redirect('/')
    }
    req.body.email = validator.normalizeEmail(req.body.email, { gmail_remove_dots: false })
  
    // Passport Authentication
    passport.authenticate('local', (err, user, info) => {
      if (err) { return next(err) }
      if (!user) {
        req.flash('errors', info)
        return res.redirect('/')
      }
      req.logIn(user, async (err) => {
        if (err) { return next(err) }
        req.flash('success', { msg: 'Success! You are logged in.' })
        const bookItems = await Books.find({user:req.user.id}).sort({rating: -1})
        const booksRead = await Books.find({user: req.user.id, completed: true})
        res.render('dashboard.ejs', {userName: req.user.userName, books: bookItems, user: req.user.id, booksRead: booksRead})
      })
    })(req, res, next)
  },
  
  // Logs user out
  logout: (req, res) => {
    req.logout()
    req.session.destroy((err) => {
      if (err) console.log('Error : Failed to destroy the session during logout.', err)
      req.user = null
      res.redirect('/')
    })
  },
  
  // Render signup page
  getSignup: (req, res) => {
    res.render('signup')
  },
  
  // Create new user from signup page
  postSignup: (req, res, next) => {
    // Verifies all sign up info is correct (password length, email, etc.)
    const validationErrors = []
    if (!validator.isEmail(req.body.email)) validationErrors.push({ msg: 'Please enter a valid email address.' })
    if (!validator.isLength(req.body.password, { min: 8 })) validationErrors.push({ msg: 'Password must be at least 8 characters long' })
    if (req.body.password !== req.body.confirmPassword) validationErrors.push({ msg: 'Passwords do not match' })
  
    if (validationErrors.length) {
      req.flash('errors', validationErrors)
      return res.redirect('../signup')
    }
    req.body.email = validator.normalizeEmail(req.body.email, { gmail_remove_dots: false })
  
    // Adds user information from sign up form to MongoDB User collection
    const user = new User({
      userName: req.body.userName,
      email: req.body.email,
      password: req.body.password
    })
  
    // Verifies user does not already exist
    User.findOne({$or: [
      {email: req.body.email},
      {userName: req.body.userName}
    ]}, (err, existingUser) => {
      if (err) { return next(err) }
      if (existingUser) {
        req.flash('errors', { msg: 'Account with that email address or username already exists.' })
        return res.redirect('../signup')
      }
      // Saves user in DB and renders dashboard
      user.save((err) => {
        if (err) { return next(err) }
        req.logIn(user, async (err) => {
          if (err) {
            return next(err)
          }
          const bookItems = await Books.find({user:req.user.id}).sort({rating: -1})
          const booksRead = await Books.find({user: req.user.id, completed: true})
          res.render('dashboard.ejs', {userName: req.user.userName, books: bookItems, user: req.user.id, booksRead: booksRead})
        })
      })
    })
  }
}