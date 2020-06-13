let Parsers = {
  slashCommand: function parseSlashCommand(command) {
    let slashCommand
    let match = command.match(/^\/(\w+)/)
    if (match) slashCommand = match[1]
    return slashCommand
  },

  subcommand: function parseSubcommand(command) {
    let subcommand = ""
    let match = command.match(/^\/\w+\s+(\w+)/)
    if (match) subcommand = match[1]
    return subcommand
  },

  args: function parseArgs(command) {
    let args = ""
    let match = command.match(/^\/\w+\s+\w+\s+(.*)/)
    if (match) args = match[1]
    return args
  },

  id: function parseId(args, defaultValue = null) {
    let id = defaultValue
    let match = args.match(/^(\d+)/)
    if (match) {
      id = Number(match[1])
    }
    return id
  },

  name: function parseName(args, defaultValue = null) {
    let match = args.match(/^(?:"([^"]*)"|(\S+))/)
    let name = match ? match[1] || match[2] : defaultValue
    return name || defaultValue
  },

  idList: function parseIdList(key, args, defaultValue = []) {
    let list
    let value = this.matchOnKey(key, args)
    if (value) list = value.split(',').map(token => Number(token))
    return list || defaultValue
  },
  
  stringValue: function parseStringValue(key, args, defaultValue = null) {
    let value = this.matchOnKey(key, args)
    return value || defaultValue
  },

  matchOnKey: function matchOnKey(key, args) {
    let match = args.match(new RegExp(`\\s+${key}=(?:"([^\\"]+)"|(\\S+))`))
    return match ? match[1] || match[2] : undefined
  }
}

module.exports = Parsers
