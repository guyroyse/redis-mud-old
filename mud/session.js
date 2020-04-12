const Dungeon = require('./things').Dungeon
const Commands = require('./commands')

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

class MessageProcessor {
  constructor(ws) {
    this.ws = ws
  }

  processMessage(message, currentRoom) {
    let command

    let commandTable = {
      '/look': () => new Commands.Look(currentRoom),
      '/emote': () => new Commands.Emote(),
      '/describe': () => new Commands.Describe(currentRoom)
    }

    if (this.isSlashCommand(message)) {
      let slashCommand = this.extractSlashCommand(message)
      command = (commandTable[slashCommand] || (() => new Commands.Error()))()
    } else {
      command = new Commands.Say()
    }

    command.execute(this.ws, message)
  }

  isSlashCommand(slashCommand) {
    return slashCommand.startsWith('/')
  }

  extractSlashCommand(message) {
    return message.split(' ')[0]
  }

}

module.exports = Session
