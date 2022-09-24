module.exports = {
  // Ensures that current user is logged in to access information
    ensureAuth: function (req, res, next) {
      if (req.isAuthenticated()) {
        return next()
      } else {
        res.redirect('/')
      }
    },
  // Ensures guest is allowed access to information
    ensureGuest: function (req, res, next) {
      if (!req.isAuthenticated()) {
        return next()
      } else {
        res.redirect('/dashboard')
      }
    },
  }
  