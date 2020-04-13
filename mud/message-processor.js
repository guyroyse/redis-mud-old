const Look = require('./commands/look-command')
const Emote = require('./commands/emote-command')
const Describe = require('./commands/describe-command')
const Error = require('./commands/error-command')
const Say = require('./commands/say-command')

const commandTable = {
  '/look': Look,
  '/emote': Emote,
  '/describe': Describe
}

class MessageProcessor {

  processMessage(message, currentRoom) {
    let clazz
    if (this.isSlashCommand(message)) {
      let slashCommand = this.extractSlashCommand(message)
      clazz = commandTable[slashCommand] || Error 
    } else {
      clazz = Say
    }

    return new clazz().execute(message, currentRoom)
  }

  isSlashCommand(slashCommand) {
    return slashCommand.startsWith('/')
  }

  extractSlashCommand(message) {
    return message.split(' ')[0]
  }

}

module.exports = MessageProcessor
