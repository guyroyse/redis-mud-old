module.exports = {
  slashCommand: function parseSlashCommand(command, defaultValue) {
    let slashCommand = defaultValue
    let match = command.match(/^\/(\w+).*$/)
    if (match) slashCommand = match[1]
    return slashCommand
  },

  subcommand: function parseSubcommand(command, defaultValue) {
    let subcommand = defaultValue
    let match = command.match(/^\/\w+\s+(\w+).*$/)
    if (match) subcommand = match[1]
    return subcommand
  },

  args: function parseArgs(command, defaultValue = "") {
    let args = defaultValue
    let match = command.match(/^\/\w+\s+\w+\s+(.*)$/)
    if (match) args = match[1]
    return args
  },

  id: function parseId(args, defaultValue) {
    let id = defaultValue
    let match = args.match(/^(\d+)/)
    if (match) {
      id  = Number(match[1])
    }
    return id

  },

  name: function parseName(args) {
    let match = args.match(/^(".+"|\S+)/)
    let name = match ? match[1] : null
    name = this.stripQuotes(name)
    return name
  },

  idList: function parseIdList(key, args, defaultValue) {
    let list = defaultValue
    let match = this.matchOnKey(key, args)
    if (match) {
      let tokens = match[1].split(',')
      list = tokens.map(token => Number(token))
    }
    return list
  },
  
  stringValue: function parseStringValue(key, args, defaultValue) {
    let match = this.matchOnKey(key, args)
    let value = match ? match[1] : defaultValue
    value = this.stripQuotes(value)
    return value
  },

  matchOnKey: function matchOnKey(key, args) {
    return args.match(new RegExp(`\\s+${key}=("[^\\"]+"|\\S+)`))
  },

  stripQuotes: function stripQuotes(s) {
    if (s) {
      if (s.startsWith('"')) {
        s = s.substring(1)
      }  
      if (s.endsWith('"')) {
        s = s.substring(0, s.length - 1)
      }
    }
    return s
  }
}
