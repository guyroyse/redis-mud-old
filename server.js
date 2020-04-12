const Mud = require('./mud')

const WebSocketServer = Mud.Servers.WebSocketServer
const HttpServer = Mud.Servers.HttpServer

const Session = Mud.Session

let wss = new WebSocketServer()
wss.start(8081)

wss.onConnection(async ws => {
  let session = new Session(ws)
  await session.start()
  wss.onMessage(ws, message => session.processMessage(message))
})

HttpServer.start()
