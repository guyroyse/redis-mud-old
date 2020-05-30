const TextController = require('./text/text-controller')
const Context = require('./context')

class Session {

  constructor(ws) {
    this.ws = ws
    this.context = new Context()
    this.controller = new TextController()
  }

  async start() {
    await this.context.load()

    let message = this.controller.processStart(this.context)
    this.sendMessage(message)
  }

  async processMessage(data) {
    let request = JSON.parse(data)
    let command = request.command

    let message = await this.controller.processMessage(this.context, command)
    this.sendMessage(message)
  }

  sendMessage(s) {
    let response = { messages: s.split('\n') }
    this.ws.send(JSON.stringify(response))
  }

}

module.exports = Session
