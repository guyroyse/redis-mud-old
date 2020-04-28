const Motd = require('../motd')

class Utility{
  static makeMessage(message){
    return {messages:[message]}
  }
  static makeMessages(messages){
    return {messages:[...messages]}
  }
}

class Create {
  async createRoom(dungeon, name){
    let obj = await dungeon.createRoom(name)
    return Utility.makeMessage(`Room '${name}' created with ID of ${obj.id()}.`)
  }
  async createPortal(dungeon, name){
    let obj = await dungeon.createPortal(name);
    return Utility.makeMessage(`Portal '${name}' created with ID of ${obj.id()}.`)
  }
  async createWindow(){
    return Utility.makeMessage(`Sorry, I don't do windows :)!`)
  }
  async createUnknown(thing){
    return Utility.makeMessage(`I don't know how to create a '${thing}'.`)
  }
  async createThing(dungeon, thing, name){
    if(thing==null || thing=='')
    {
      return Utility.makeMessage(`If you need help, try 'create [TYPE_OF_THING] [NAME_OF_THING]'`)
    } else if(name==null || name=='') {
      return Utility.makeMessage(`Things need names, there, bud!`)
    } else {
      switch(thing) {
        case "room":
          return await this.createRoom(dungeon, name);
        case "portal":
          return await this.createPortal(dungeon, name);
        case "window":
          return await this.createWindow();
        default:
          return await this.createUnknown(thing);
      }
    }
  }
  async execute({ dungeon }, user, message) {
    let [ , thing, name ] = message.match(/^\/create(?:\s+(\w+)\s*(.*))?$/)
    return await this.createThing(dungeon, thing, name)
  }
}

class Describe {
  execute({ players }, user, message) {
    let [ , description ] = message.match(/^\/describe\s+room\s+(.*)$/)
    players[user.id()].room.description(description)
    return Utility.makeMessage("Room description updated.")
  }
}

class Emote {
  execute({}, user, message) {
    let [ , emote ] = message.match(/^\/emote\s+(.*)$/)
    return Utility.makeMessage(`Player ${emote}`)
  }
}

class Error {
  execute({}, user, message) {
    return Utility.makeMessage(`Invalid command '${message}'`)
  }
}

class List {
  async execute({ dungeon }, user, message) {
    let [ , things] = message.match(/^\/list(?:\s+(\w+))?$/)
    if(things==null || things=='') {
      things="rooms"
    }
    switch(things)
    {
      case "rooms":
        {
          let rooms = await dungeon.fetchRoomList()
          return Utility.makeMessages(rooms.map(room => `[${room.name()}] ${room.id()}`))
        }
      default:
        {
          return Utility.makeMessage(`I don't see a list of '${things}' anywhere....`)
        }
    }
  }
}

class Look {
  execute({ players }, user) {
    let room = players[user.id()].room
    return Utility.makeMessage(`[${room.name()}]: ${room.description()}`)
  }
}

class Rename {
  execute({ players }, user, message) {
    let [ , name ] = message.match(/^\/rename\s+room\s+(.*)$/)
    players[user.id()].room.name(name)
    return Utility.makeMessage("Room renamed.")
  }
}

class Say {
  execute({}, user, message) {
    return Utility.makeMessage(`You said: ${message}`)
  }
}

class Teleport {
  async execute(context, user, message) {
    let [ , id ] = message.match(/^\/teleport\s+(.*)$/)
    let room = await context.dungeon.fetchRoom(Number(id))
    context.players[user.id()].room = room
    return Utility.makeMessage(`Teleported to [${room.name()}].`)
  }
}

class Hello {
  async execute(context, user, message) {
    let motd = Motd.fetchMotd()
    return {'messages': [...motd]}
  }
}

module.exports = { Describe, Create, Emote, List, Error, Look, Rename, Say, Teleport, Hello }
