const WebSocket = require('ws')
const Session = require('./mud/session')

function init(server, sessionParser) {

  let wss = new WebSocket.Server({
    port: 8081,
    server,
    verifyClient: (info, done) => {
      sessionParser(info.req, {}, () => {
        done(info.req)
      })
    }
  })
  
  wss.on('connection', async (ws, req) => {
  
    console.log(req.session.passport.user)
  
    let session = new Session(ws)
    await session.start()
  
    ws.on('message', async message => await session.processMessage(message))
  })
  
}

module.exports = init
