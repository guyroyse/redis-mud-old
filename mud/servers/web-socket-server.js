const WebSocket = require('ws')

class WebSocketServer {

  start(port = 8081) {
    this.wss = new WebSocket.Server({ port })
  }

  onConnection(callback) {
    this.wss.on('connection', ws => callback(ws))
  }

  onMessage(ws, callback) {
    ws.on('message', message => callback(message))
  }

}

module.exports = WebSocketServer
