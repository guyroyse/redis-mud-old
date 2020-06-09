const Parsers = require('./argument-parsers')

const { Say, Emote, Describe, Rename, List, Error, Teleport } = require('../commands')

const { Create, CreateRoom, CreateDoor } = require('./create')
const Look = require('./look')
const Use = require('./use')


const slashCommandDelegates = {
  '/emote': Emote,
  '/look': Look,
  '/describe': Describe,
  '/rename': Rename,
  '/create': Create,
  '/list': List,
  '/teleport': Teleport,
  '/use': Use
}

class Command {
  async execute(context, command) {
    let delegateClass = this.selectDelegateClass(command)
    let delegate = new delegateClass()
    return await delegate.execute(context, command)
  }

  selectDelegateClass(command) {
    if (this.isSlashCommand(command)) {
      let slashCommand = this.extractSlashCommand(command)
      return slashCommandDelegates[slashCommand] || Error 
    }

    return Say
  }

  isSlashCommand(slashCommand) {
    return slashCommand.startsWith('/')
  }

  extractSlashCommand(command) {
    return command.split(' ')[0]
  }
}

module.exports = Command
