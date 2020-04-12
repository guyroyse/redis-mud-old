const WebSocketServer = require('./web-socket-server')
const HttpServer = require('./http-server')
const MudSession = require('./mud').Session

let wss = new WebSocketServer()
wss.start(8081)

wss.onConnection(async ws => {
  let session = new MudSession(ws)
  await session.start()
  wss.onMessage(ws, message => session.processMessage(message))
})

HttpServer.start()
