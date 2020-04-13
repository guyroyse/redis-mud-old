const WebSocketServer = require('./mud/servers/web-socket-server')
const HttpServer = require('./mud/servers/http-server')
const Session = require('./mud/session')

let wss = new WebSocketServer()
wss.start(8081)

wss.onConnection(async ws => {
  let session = new Session(ws)
  await session.start()
  wss.onMessage(ws, message => session.processMessage(message))
})

HttpServer.start()
