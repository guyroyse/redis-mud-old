const Mud = require('./mud')

const WebSocketServer = require('./web-socket-server')
const HttpServer = require('./http-server')
const Session = Mud.Session

let wss = new WebSocketServer()
wss.start(8081)

wss.onConnection(async ws => {
  let session = new Session(ws)
  await session.start()
  wss.onMessage(ws, message => session.processMessage(message))
})

HttpServer.start()
