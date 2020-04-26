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

class CommandProcessor {

  async processMessage(context, message) {
    let trimmed = message.trim()

    let clazz
    if (this.isSlashCommand(trimmed)) {
      let slashCommand = this.extractSlashCommand(trimmed)
      clazz = commandTable[slashCommand] || Error 
    } else {
      clazz = Say
    }

    return await new clazz().execute(context, trimmed)
  }

  isSlashCommand(slashCommand) {
    return slashCommand.startsWith('/')
  }

  extractSlashCommand(message) {
    return message.split(' ')[0]
  }

}

module.exports = CommandProcessor
