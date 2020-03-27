const http = require('http')

const StaticServer = require('node-static').Server
const WebSocketServer = require('ws').Server
const RedisGraph = require("redisgraph.js").Graph

let graph = new RedisGraph("dungeon")

const NULL_UUID = '00000000-0000-0000-0000-000000000000'

async function main() {

  let room = await fetchOrCreateHub()
  let httpServer = createHttpServer()
  let wss = new WebSocketServer({ port: 8081 })
  
  wss.on('connection', ws => {
  
    ws.send("Welcome to RedisMUD!")
    ws.send("Beware. You are likely to be eaten by a grue.")
    ws.send('')
    ws.send(`You are in [${room.name}]`)

    ws.on('message', message => {
      console.log('received:', message)
      ws.send(`Echo: ${message}`)
    })
  
  })
  
  httpServer.listen(8080)

}

async function fetchOrCreateHub() {

  const FETCH_HUB = `MATCH (r:room { uuid: '${NULL_UUID}'}) RETURN r`

  const CREATE_AND_FETCH_HUB = `
    CREATE (r:room { 
      uuid: '${NULL_UUID}',
      name: 'The Hub',
      desc: 'Huge hub is huge.'})
    RETURN r`

  let result = await graph.query(FETCH_HUB)
  if (!result.hasNext()) {
    result = await graph.query(CREATE_AND_FETCH_HUB)
  }

  let record = result.next()
  let room = record.get("r").properties

  return room

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

