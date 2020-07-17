const express = require('express')
const WebSocket = require('ws')
const Session = require('./mud/session')

const app = express()

app.use(express.static('static'))

let wss = new WebSocket.Server({
  port: 8081,
  verifyClient: (info, done) => {
    console.log("verifying client", info.req.session)
    done(true)
  }
})

wss.on('connection', async ws => {
  let session = new Session(ws)
  await session.start()

  ws.on('message', async message => await session.processMessage(message))
})

app.listen(8080, () => console.log(`Listening on port 8080`))
