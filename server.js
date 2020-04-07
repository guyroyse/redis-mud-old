const http = require('http')

const StaticServer = require('node-static').Server
const WebSocketServer = require('ws').Server

const { MudSession } = require('./redis-mud')

async function main() {

  let wss = new WebSocketServer({ port: 8081 })
  wss.on('connection', async ws => {
    let session = new MudSession(ws)
    await session.start()
    ws.on('message', message => session.processMessage(message))
  })
  
  let httpServer = createHttpServer()
  httpServer.listen(8080)

}

function createHttpServer() {

  let staticServer = new StaticServer('./static')

  let httpServer = http.createServer((request, response) => {
    request
      .addListener('end', () => staticServer.serve(request, response))
      .resume()
  })

  return httpServer

}

main()

