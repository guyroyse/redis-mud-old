const http = require('http')

const StaticServer = require('node-static').Server
const WebSocketServer = require('ws').Server

const Dungeon = require('./src/dungeon')
const LookCommand = require('./src/look-command')

let dungeon = new Dungeon()

async function main() {

  let currentRoom = await dungeon.fetchOrCreateHub()
  let httpServer = createHttpServer()
  let wss = new WebSocketServer({ port: 8081 })
  
  wss.on('connection', ws => {
  
    ws.send("Welcome to RedisMUD!")
    ws.send("Beware. You are likely to be eaten by a grue.")
    sendPrompt(ws, currentRoom)

    ws.on('message', message => {

      if (message === '/look') {
        let command = new LookCommand(currentRoom)
        command.execute().forEach(s => ws.send(s))
        sendPrompt(ws, currentRoom)
      } else {
        ws.send(`You said: ${message}`)
      }

    })
  
  })
  
  httpServer.listen(8080)

}

function sendPrompt(ws, currentRoom) {
  ws.send("")
  ws.send(`You are in [${currentRoom.name}]`)
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

