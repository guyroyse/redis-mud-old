const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')

let ourUsers

function init(app, users) {

  ourUsers = users

  let strategy = new LocalStrategy({ usernameField: 'name', passwordField: 'password' }, authenticate)
  passport.use(strategy)
  passport.serializeUser(serializeUser)
  passport.deserializeUser(deserializeUser)

  app.use(passport.initialize())
  app.use(passport.session())
}

async function authenticate(name, password, done) {
  let user = ourUsers.find(user => user.name === name)
  if (!user) return done(null, false, { message: "Invalid username"})

  let success = await bcrypt.compare(password, user.hashedPassword)
  if (!success) return done(null, false, { message: "Invalid password" })
  
  return done(null, user)
}

function serializeUser(user, done) {
  done(null, user.name);
}

function deserializeUser(id, done) {
  done(null, ourUsers.find(user => user.name === id))
}

module.exports = init
