const {
  Say, Emote, Look, 
  Create, List, Error, Teleport, Hello, Delete, Uname, Help } = require('./commands')

const commandTable = {
  '/emote': Emote,
  '/look': Look,
  '/create': Create,
  '/list': List,
  '/teleport': Teleport,
  '/hello': Hello,
  '/delete': Delete,
  '/uname' : Uname,
  '/help' : Help,
  '/?' : Help
}

class CommandProcessor {

  async processMessage(context, user, message) {
    let request=JSON.parse(message)

    let trimmed = request.message.trim()
    let clazz
    if (this.isSlashCommand(trimmed)) {
      let slashCommand = this.extractSlashCommand(trimmed)
      clazz = commandTable[slashCommand] || Error 
    } else {
      clazz = Say
    }
    return await new clazz().execute(context, user, trimmed)
  }

  isSlashCommand(slashCommand) {
    return slashCommand.startsWith('/')
  }

  extractSlashCommand(message) {
    return message.split(' ')[0]
  }

}

module.exports = CommandProcessor
