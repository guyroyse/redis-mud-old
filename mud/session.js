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

    if (request.type === 'validation') {
      
      let response
      if (request.token) {
        response = { type: 'validation', valid: true }
      } else {
        response = { type: 'validation', valid: false }
      }

      this.ws.send(JSON.stringify(response))
    } else if (request.type === 'login') {
      let response = { type: 'login', valid: true, token: 'bob' }
      this.ws.send(JSON.stringify(response))
    } else if (request.type === 'command') {
      let command = request.command
      let message = await this.controller.processMessage(this.context, command)
      this.sendMessage(message)  
    }
  }

  sendMessage(s) {
    let response = { type: 'message', messages: s.split('\n') }
    this.ws.send(JSON.stringify(response))
  }

}

module.exports = Session
