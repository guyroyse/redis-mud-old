const {
  Say, Emote, Look, 
  Create, List, Error, Teleport, Hello, Delete } = require('./commands')

const commandTable = {
  '/emote': Emote,
  '/look': Look,
  '/create': Create,
  '/list': List,
  '/teleport': Teleport,
  '/hello': Hello,
  '/delete': Delete
}

class CommandProcessor {

  async processMessage(context, message) {
    let request=JSON.parse(message)

    let user = await context.authenticate(request.auth)
    if(user==null){
      user = await context.createPlayer();
      return {auth:`${user.id()}`,status:'identity'}
    } else if (request.message==null) {
      return {auth:`${user.id()}`,status:'identity'}
    } else {
      let trimmed = request.message.trim()
      let clazz
      if (this.isSlashCommand(trimmed)) {
        let slashCommand = this.extractSlashCommand(trimmed)
        clazz = commandTable[slashCommand] || Error 
      } else {
        clazz = Say
      }
      let response = await new clazz().execute(context, user, trimmed)
      //fetch the occupies 
      return response
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
