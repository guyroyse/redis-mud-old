const Look = require('./commands/look-command')
const Emote = require('./commands/emote-command')
const Describe = require('./commands/describe-command')
const Error = require('./commands/error-command')
const Say = require('./commands/say-command')

class MessageProcessor {

  processMessage(message, currentRoom) {
    let command

    let commandTable = {
      '/look': () => new Look(currentRoom),
      '/emote': () => new Emote(),
      '/describe': () => new Describe(currentRoom)
    }

    if (this.isSlashCommand(message)) {
      let slashCommand = this.extractSlashCommand(message)
      command = (commandTable[slashCommand] || (() => new Error()))()
    } else {
      command = new Say()
    }

    return command.execute(message)
  }

  isSlashCommand(slashCommand) {
    return slashCommand.startsWith('/')
  }

  extractSlashCommand(message) {
    return message.split(' ')[0]
  }

}

module.exports = MessageProcessor
