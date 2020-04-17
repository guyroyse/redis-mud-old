const Say = require('./commands/say')
const Emote = require('./commands/emote')
const Look = require('./commands/look')
const Describe = require('./commands/describe')
const Rename = require('./commands/rename')
const Create = require('./commands/create')
const Error = require('./commands/error')

const commandTable = {
  '/emote': Emote,
  '/look': Look,
  '/describe': Describe,
  '/rename': Rename,
  '/create': Create
}

class MessageProcessor {

  processMessage(context, message) {
    let clazz
    if (this.isSlashCommand(message)) {
      let slashCommand = this.extractSlashCommand(message)
      clazz = commandTable[slashCommand] || Error 
    } else {
      clazz = Say
    }

    return [ new clazz().execute(context, message) ]
  }

  isSlashCommand(slashCommand) {
    return slashCommand.startsWith('/')
  }

  extractSlashCommand(message) {
    return message.split(' ')[0]
  }

}

module.exports = MessageProcessor
