module.exports = {
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
