const Dungeon = require('./dungeon')
const Commands = require('./commands')

class Session {

  constructor(ws) {
    this.ws = ws
  }

  async start() {
    this.dungeon = new Dungeon()
    this.dungeon.open('dungeon')
    this.currentRoom = await this.dungeon.fetchOrCreateHub()

    this.sendMotd()
    this.sendPrompt()
  }

  processMessage(message) {
    let command

    if (message === '/look') {
      command = new Commands.Look(this.currentRoom)
    } else {
      command = new Commands.Say(message)
    }

    command.execute(this.ws)
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
