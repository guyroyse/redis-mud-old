const Parsers = require('./parsers')

const { Say, Emote, Describe, Rename, List, Error, Teleport } = require('../commands')

const { Create } = require('./create')
const { Edit } = require('./edit')
const Look = require('./look')
const Use = require('./use')


const slashCommandDelegates = {
  'emote': Emote,
  'look': Look,
  'describe': Describe,
  'rename': Rename,
  'create': Create,
  'list': List,
  'teleport': Teleport,
  'use': Use,
  'edit': Edit
}

class Command {
  async execute(context, command) {
    let delegateClass = this.selectDelegateClass(command)
    let delegate = new delegateClass()
    return await delegate.execute(context, command)
  }

  selectDelegateClass(command) {
    if (this.isSlashCommand(command)) {
      let slashCommand = Parsers.slashCommand(command)
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
