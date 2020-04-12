const Dungeon = require('./things').Dungeon

const MessageProcessor = require('./message-processor')

class Session {

  constructor(ws) {
    this.ws = ws
    this.messageProcessor = new MessageProcessor(ws)
  }

  async start() {
    this.dungeon = new Dungeon()
    this.dungeon.open('dungeon')

    this.currentRoom = await this.dungeon.fetchOrCreateHub()

    this.sendMotd()
    this.sendPrompt()
  }

  processMessage(message) {
    this.messageProcessor.processMessage(message, this.currentRoom)
    this.sendPrompt()
  }

  sendMotd() {
    this.ws.send("Welcome to RedisMUD!")
    this.ws.send("Beware. You are likely to be eaten by a grue.")
    this.ws.send("")
  }
  
  sendPrompt() {
    this.ws.send(`You are in [${this.currentRoom.name()}]`)
    this.ws.send("")
  }

}

module.exports = Session
