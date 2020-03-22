const http = require('http')

const StaticServer = require('node-static').Server
const WebSocketServer = require('ws').Server

let staticServer = new StaticServer('./static')

let httpServer = http.createServer((request, response) => {
  request
    .addListener('end', () => staticServer.serve(request, response))
    .resume()
})

let wss = new WebSocketServer({ port: 8081 })

wss.on('connection', ws => {
  ws.on('message', message => {
    console.log('received:', message)
    ws.send(`Yo: ${message}`)
  })
})

httpServer.listen(8080)
