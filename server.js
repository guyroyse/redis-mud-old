const setupWebSocket = require('./setup-websocket')
const setupPassport = require('./setup-passport')
const setupRoutes = require('./setup-routes')

const express = require('express')
const session = require('express-session')
const flash = require('express-flash')
const app = express()

const http = require('http')
const server = http.createServer(app)

app.set('view-engine', 'ejs')
app.use(express.static('static'))
app.use(express.urlencoded({ extended: false }))
app.use(flash())

const sessionParser = session({
  secret: '$3kr3t',
  resave: false,
  saveUninitialized: false
})

app.use(sessionParser)

setupPassport(app)
setupRoutes(app)
setupWebSocket(server, sessionParser)

app.listen(8080, () => console.log(`Listening on port 8080`))
