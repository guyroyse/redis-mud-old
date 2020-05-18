const CommandProcessor = require('./commands/command-processor')
const Motd = require('./motd')
const Prompt = require('./prompt')
const Context = require('./context')

class Session {

  constructor(ws) {
    this.ws = ws
    this.context = new Context()
    this.motd = new Motd()
    this.prompt = new Prompt()
    this.commandProcessor = new CommandProcessor()
  }

  async start() {
    await this.context.start()
    this.sendMotd()
    this.sendPrompt()
  }

  async processMessage(data) {
    let request = JSON.parse(data)
    let command = request.command

    let message = await this.commandProcessor.processMessage(this.context, command)

    this.sendText(message)
    this.sendPrompt()
  }

  sendMotd() {
    let text = this.motd.fetchMotd()
    this.sendText(text)
  }
  
  sendPrompt() {
    let text = this.prompt.fetchPrompt(this.context)
    this.sendText(text)
  }

  sendText(s) {
    let response = { messages: s.split('\n') }
    this.ws.send(JSON.stringify(response))
  }

}

module.exports = Session
