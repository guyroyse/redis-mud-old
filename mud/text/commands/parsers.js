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

  name: function parseName(args) {
    let match = args.match(/^(\S+)/)
    let name = match ? match[1] : null
    if (name.startsWith('"')) {
      match = args.match(/^"(.*?)"/)
      name = match[1]
    }
    return name
  },
  
  destinations: function parseDestinations(args, defaultValue) {
    return this.idList(args, /\s+to=(\S+)/, defaultValue)
  },
  
  locations: function parseLocations(args, defaultValue) {
    return this.idList(args, /\s+from=(\S+)/, defaultValue)
  },
  
  idList: function parseIdList(args, regex, defaultValue) {
    let list = defaultValue
    let match = args.match(regex)
    if (match) {
      let tokens = match[1].split(',')
      list = tokens.map(token => Number(token))
    }
    return list
  },
}
