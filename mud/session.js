const CommandProcessor = require('./commands/command-processor')
const Context = require('./context')
const AUTH_REQUEST = "identify"

class Session {

  constructor(ws) {
    this.ws = ws
    this.context = new Context()
    this.commandProcessor = new CommandProcessor()
  }

  async start() {
    await this.context.start()
    this.sendAuthRequest();
  }

  async processMessage(message) {
    //message comes in as JSON
    let request=JSON.parse(message)
    let response;

    //we authenticate the user with each request, for we do not trust!
    let user = await this.context.authenticate(request.auth)


    //if we don't find the user....
    if(user==null){
      //...create a user...
      user = await context.createPlayer();
      //...tell the client who he is!
      response = {auth:`${user.id()}`,status:'identity'}
    } else if (request.message==null) {
      //...or we did find the user, but he sent in no messages with it, so he is simply verifying his credentials
      response = {auth:`${user.id()}`,status:'identity'}
    } else {
      //...we found the user, and there is a message from him, so process it with the command processor
      response = await this.commandProcessor.processMessage(this.context, user, message)
    }
    //remember the user id for the session... for notifications!
    this.userId = user.id()
    this.sendResponse(response)
  }

  sendAuthRequest(){
    this.sendResponse({
      'status':AUTH_REQUEST
    });
  }

  sendResponse(r) {
    this.ws.send(JSON.stringify(r))
  }

}

module.exports = Session
