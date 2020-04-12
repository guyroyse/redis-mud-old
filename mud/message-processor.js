const Commands = require('./commands')

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

module.exports = MessageProcessor
