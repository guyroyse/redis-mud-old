const {
  Say, Emote, Look, Describe, Rename, 
  Create, List, Error, Teleport, Hello } = require('./commands')

const commandTable = {
  '/emote': Emote,
  '/look': Look,
  '/describe': Describe,
  '/rename': Rename,
  '/create': Create,
  '/list': List,
  '/teleport': Teleport,
  '/hello': Hello
}

class CommandProcessor {

  async processMessage(context, message) {
    let request=JSON.parse(message)

    //check auth!
    let user = await context.authenticate(request.auth)
    if(user==null){
      user = await context.createPlayer();
      return {auth:`${user.id()}`,status:'newauth'}
    } else if (request.message==null) {
      return {auth:`${user.id()}`,status:'newauth'}
    } else {
      let trimmed = request.message.trim()
      let clazz
      if (this.isSlashCommand(trimmed)) {
        let slashCommand = this.extractSlashCommand(trimmed)
        clazz = commandTable[slashCommand] || Error 
      } else {
        clazz = Say
      }
      return await new clazz().execute(context, trimmed)
    }
  }

  isSlashCommand(slashCommand) {
    return slashCommand.startsWith('/')
  }

  extractSlashCommand(message) {
    return message.split(' ')[0]
  }

}

module.exports = CommandProcessor
