const WebSocketServer = require('./mud/servers/web-socket-server')
const HttpServer = require('./mud/servers/http-server')
const Session = require('./mud/session')
const EventSubscriber = require('./mud/servers/event-subscribe')

let wss = new WebSocketServer()
wss.start(8081)

wss.onConnection(async ws => {
  let session = new Session(ws)
  await session.start()
  wss.onMessage(ws, async message => await session.processMessage(message))

  let eventSubscriber = new EventSubscriber()
  eventSubscriber.start(message => session.processEvent(message))
})

HttpServer.start()
