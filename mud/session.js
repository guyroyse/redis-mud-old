const MessageProcessor = require('./message-processor')
const Dungeon = require('./things/dungeon')

class Session {

  constructor(ws) {
    this.ws = ws
    this.messageProcessor = new MessageProcessor()
  }

  async start() {
    this.dungeon = new Dungeon()
    this.dungeon.open('dungeon')

    this.currentRoom = await this.dungeon.fetchOrCreateHub()

    this.sendMotd()
    this.sendPrompt()
  }

  processMessage(message) {
    let response = this.messageProcessor.processMessage(message, this.currentRoom)
    this.ws.send("")
    this.ws.send(response)
    this.sendPrompt()
  }

  sendMotd() {
    this.ws.send("Welcome to RedisMUD!")
    this.ws.send("Beware. You are likely to be eaten by a grue.")
  }
  
  sendPrompt() {
    this.ws.send("")
    this.ws.send(`You are in [${this.currentRoom.name()}]`)
  }

}

module.exports = Session
