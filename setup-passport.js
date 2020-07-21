const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')

const { User } = require('./mud/things/things')

function init(app) {
  let strategy = new LocalStrategy({ usernameField: 'name', passwordField: 'password' }, authenticate)
  passport.use(strategy)
  passport.serializeUser(serializeUser)
  passport.deserializeUser(deserializeUser)

  app.use(passport.initialize())
  app.use(passport.session())
}

async function authenticate(name, password, done) {
  let user = await User.byId(name)
  if (!user) return done(null, false, { message: "Invalid username"})

  let success = await bcrypt.compare(password, user.password)
  if (!success) return done(null, false, { message: "Invalid password" })
  
  return done(null, user)
}

async function serializeUser(user, done) {
  done(null, user.id);
}

async function deserializeUser(id, done) {
  done(null, await User.byId(id))
}

module.exports = init
