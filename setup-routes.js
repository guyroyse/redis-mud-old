const passport = require('passport')
const bcrypt = require('bcrypt')

function init(app, users) {

  app.get('/', checkAuthenticated, (req, res) => {
    res.render('index.ejs')
  })

  app.get('/login', checkNotAuthenticated, (req, res) => {
    res.render('login.ejs')
  })

  app.post('/login', checkNotAuthenticated, passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
  }))

  app.get('/signup', checkNotAuthenticated, (req, res) => {
    res.render('signup.ejs')
  })

  app.post('/signup', checkNotAuthenticated, async (req, res) => {
    let name = req.body.name
    let hashedPassword = await bcrypt.hash(req.body.password, 10)
    users.push({ name, hashedPassword })
    res.redirect('/login')
  })

  app.get('/logout', checkAuthenticated, function(req, res) {
    req.logout()
    res.redirect('/login')
  })
}

function checkAuthenticated(req, res, next) {
  if (req.isAuthenticated()) return next()
  res.redirect('/login')
}

function checkNotAuthenticated(req, res, next) {
  if (!req.isAuthenticated()) return next()
  res.redirect('/')
}

module.exports = init
