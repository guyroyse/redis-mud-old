const Motd = require('./motd')
const Prompt = require('./prompt')

const Command = require('./commands/command')

class TextController {
  constructor() {
    this._motd = new Motd()
    this._prompt = new Prompt()
  }

  processStart(context) {
    let motd = this._motd.fetchMotd()
    let prompt = this._prompt.fetchPrompt(context)
    return [ motd, prompt ].join('\n')
  }

  async processMessage(context, message) {
    let result = await new Command().execute(context, message.trim())
    let prompt = this._prompt.fetchPrompt(context)
    return [ result, prompt ].join('\n')
  }

  isSlashCommand(slashCommand) {
    return slashCommand.startsWith('/')
  }

  extractSlashCommand(message) {
    return message.split(' ')[0]
  }

}

module.exports = TextController
