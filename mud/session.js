const MessageProcessor = require('./message-processor')
const Motd = require('./motd')
const Prompt = require('./prompt')
const Context = require('./context')

class Session {

  constructor(ws) {
    this.ws = ws
    this.context = new Context()
    this.motd = new Motd()
    this.prompt = new Prompt()
    this.messageProcessor = new MessageProcessor()
  }

  async start() {
    await this.context.start()
    this.sendMotd()
    this.sendPrompt()
  }

  async processMessage(message) {
    let text = await this.messageProcessor.processMessage(this.context, message)
    this.sendText(text)
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
    this.ws.send(s.split('\n').join('<br/>'))
  }

}

module.exports = Session
