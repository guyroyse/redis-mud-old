const HttpServer = require('./http-server')

const WebSocketServer = require('ws').Server

const MudSession = require('./mud').Session

async function main() {

  let wss = new WebSocketServer({ port: 8081 })
  wss.on('connection', async ws => {
    let session = new MudSession(ws)
    await session.start()
    ws.on('message', message => session.processMessage(message))
  })

  HttpServer.start()

}

main()

