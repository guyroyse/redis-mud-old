const Motd = require('./motd')
const Prompt = require('./prompt')

const { Say, Emote, Describe, Rename, List, Error, Teleport } = require('./commands')

const Create = require('./commands/create')
const Look = require('./commands/look')
const Use = require('./commands/use')

const commandTable = {
  '/emote': Emote,
  '/look': Look,
  '/describe': Describe,
  '/rename': Rename,
  '/create': Create,
  '/list': List,
  '/teleport': Teleport,
  '/use': Use
}

class TextController {
  constructor() {
    this._motd = new Motd()
    this._prompt = new Prompt()
  }

  processStart(context) {
    return [
      this._motd.fetchMotd(),
      this._prompt.fetchPrompt(context)
    ].join('\n')
  }

  async processMessage(context, message) {
    let trimmed = message.trim()

    let clazz
    if (this.isSlashCommand(trimmed)) {
      let slashCommand = this.extractSlashCommand(trimmed)
      clazz = commandTable[slashCommand] || Error 
    } else {
      clazz = Say
    }

    return [
      await new clazz().execute(context, trimmed),
      this._prompt.fetchPrompt(context)
    ].join('\n')
  }

  isSlashCommand(slashCommand) {
    return slashCommand.startsWith('/')
  }

  extractSlashCommand(message) {
    return message.split(' ')[0]
  }

}

module.exports = TextController
