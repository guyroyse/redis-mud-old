const CommandProcessor = require('./commands/command-processor')
const Prompt = require('./prompt')
const Context = require('./context')

class Session {

  constructor(ws) {
    this.ws = ws
    this.context = new Context()
    this.prompt = new Prompt()
    this.commandProcessor = new CommandProcessor()
  }

  async start() {
    await this.context.start()
    this.sendAuthRequest();
    // this.sendMotd()
  }

  async processMessage(message) {
    let response = await this.commandProcessor.processMessage(this.context, message)
    this.sendResponse(response)
  }

  sendAuthRequest(){
    this.sendResponse({
      'status':'authRequest',
      'messages':[]
    });
  }

  sendResponse(r) {
    this.ws.send(JSON.stringify(r))
  }

}

module.exports = Session
