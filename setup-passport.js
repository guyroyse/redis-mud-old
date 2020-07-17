const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')

function init(app, users) {

  passport.use(
    new LocalStrategy({ usernameField: 'name', passwordField: 'password' },
    async (name, password, done) => {
      let user = users.find(user => user.name === name)
      if (!user) return done(null, false, { message: "Invalid username"})
      let success = await bcrypt.compare(password, user.hashedPassword)
      if (success) {
        return done(null, user)
      } else {
        return done(null, false, { message: "Invalid password" })
      }
    }))

  passport.serializeUser((user, done) => done(null, user.name))
  passport.deserializeUser((id, done) => done(null, users.find(user => user.name === id)))

  app.use(passport.initialize())
  app.use(passport.session())
}

module.exports = init
