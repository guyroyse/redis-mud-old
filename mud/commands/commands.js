const Motd = require('../motd')

class Create {
  async createRoom(dungeon, name){
    let obj = await dungeon.createRoom(name)
    return `Room '${name}' created with ID of ${obj.id()}.`
  }
  async createPortal(dungeon, name){
    let obj = await dungeon.createPortal(name);
    return `Portal '${name}' created with ID of ${obj.id()}.`
  }
  async createWindow(){
    return `Sorry, I don't do windows :)!`
  }
  async createUnknown(thing){
    return `I don't know how to create a '${thing}'.`
  }
  async createThing(dungeon, thing, name){
    if(thing==null || thing=='')
    {
      return `If you need help, try 'create [TYPE_OF_THING] [NAME_OF_THING]'`
    } else if(name==null || name=='') {
      return `Things need names, there, bud!`
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
  async execute({ dungeon }, message) {
    let [ , thing, name ] = message.match(/^\/create(?:\s+(\w+)\s*(.*))?$/)
    return await this.createThing(dungeon, thing, name)
  }
}

class Describe {
  execute({ room }, message) {
    let [ , description ] = message.match(/^\/describe\s+room\s+(.*)$/)
    room.description(description)
    return "Room description updated."
  }
}

class Emote {
  execute({}, message) {
    let [ , emote ] = message.match(/^\/emote\s+(.*)$/)
    return `Player ${emote}`
  }
}

class Error {
  execute({}, message) {
    return `Invalid command '${message}'`
  }
}

class List {
  async execute({ dungeon }, message) {
    let [ , things] = message.match(/^\/list(?:\s+(\w+))?$/)
    if(things==null || things=='') {
      things="rooms"
    }
    switch(things)
    {
      case "rooms":
        {
          let rooms = await dungeon.fetchRoomList()
          return rooms.map(room => `[${room.name()}] ${room.id()}`).join('\n')
        }
      default:
        {
          return `I don't see a list of '${things}' anywhere....`
        }
    }
  }
}

class Look {
  execute({ room }) {
    return `[${room.name()}]: ${room.description()}`
  }
}

class Rename {
  execute({ room }, message) {
    let [ , name ] = message.match(/^\/rename\s+room\s+(.*)$/)
    room.name(name)
    return "Room renamed."
  }
}

class Say {
  execute({}, message) {
    return `You said: ${message}`
  }
}

class Teleport {
  async execute(context, message) {
    let [ , id ] = message.match(/^\/teleport\s+(.*)$/)
    let room = await context.dungeon.fetchRoom(Number(id))
    context.room = room
    return `Teleported to [${room.name()}].`
  }
}

class Hello {
  async execute(context, message) {
    let motd = Motd.fetchMotd()
    return {'messages': [...motd]}
  }
}

module.exports = { Describe, Create, Emote, List, Error, Look, Rename, Say, Teleport, Hello }
