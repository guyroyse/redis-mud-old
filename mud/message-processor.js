const {
  Say, Emote, Look, Describe, Rename, 
  Create, List, Error, Teleport } = require('./commands')

const commandTable = {
  '/emote': Emote,
  '/look': Look,
  '/describe': Describe,
  '/rename': Rename,
  '/create': Create,
  '/list': List,
  '/teleport': Teleport
}

class MessageProcessor {

  async processMessage(context, message) {
    let clazz
    if (this.isSlashCommand(message)) {
      let slashCommand = this.extractSlashCommand(message)
      clazz = commandTable[slashCommand] || Error 
    } else {
      clazz = Say
    }

    return await new clazz().execute(context, message)
  }

  isSlashCommand(slashCommand) {
    return slashCommand.startsWith('/')
  }

  extractSlashCommand(message) {
    return message.split(' ')[0]
  }

}

module.exports = MessageProcessor
