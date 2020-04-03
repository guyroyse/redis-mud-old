const http = require('http')

const StaticServer = require('node-static').Server
const WebSocketServer = require('ws').Server

const Dungeon = require('./src/dungeon')
const LookCommand = require('./src/look-command')
const SayCommand = require('./src/say-command')

let dungeon = new Dungeon()
dungeon.open('dungeon')

async function main() {

  let currentRoom = await dungeon.fetchOrCreateHub()
  let httpServer = createHttpServer()
  let wss = new WebSocketServer({ port: 8081 })
  
  wss.on('connection', ws => {

    sendMotd(ws)
    sendPrompt(ws, currentRoom)

    ws.on('message', message => {

      let command

      if (message === '/look') {
        command = new LookCommand(currentRoom)
      } else {
        command = new SayCommand(message)
      }

      command.execute(ws)
      sendPrompt(ws, currentRoom)

    })
  
  })
  
  httpServer.listen(8080)

}

function sendMotd(ws) {
  ws.send("Welcome to RedisMUD!")
  ws.send("Beware. You are likely to be eaten by a grue.")
  ws.send("")
}

function sendPrompt(ws, currentRoom) {
  ws.send(`You are in [${currentRoom.name()}]`)
  ws.send("")
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

