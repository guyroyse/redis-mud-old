const Motd = require('../motd')

const USER_NOUN="user"
const USERS_NOUN="users"
const ROOM_NOUN="room"
const ROOMS_NOUN="rooms"
const PORTAL_NOUN="portal"
const PORTALS_NOUN="portals"
const WINDOW_NOUN="window"

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
        case ROOM_NOUN:
          return await this.createRoom(dungeon, name);
        case PORTAL_NOUN:
          return await this.createPortal(dungeon, name);
        case WINDOW_NOUN:
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

class Delete {
  async deleteUser(dungeon, which){
    let id = Number(which)
    if(isNaN(id)){
      return Utility.makeMessage(`Invalid UserId '${userId}'`);
    }else{
      await dungeon.deleteUser(id)
      return Utility.makeMessage(`Deleted user '${id}' (if they exist!)`)
    }
  }

  async deleteThing(dungeon, noun, which) {
    if(noun==null || which==null){
      return Utility.makeMessage(`try 'delete [TYPE_OF_THING] [ID_OF_THING]`)
    } else {
      switch(noun){
        case USER_NOUN:
          return await this.deleteUser(dungeon, which)
        default:
          return Utility.makeMessage(`I don't how to delete a '${noun}'.`)
      }
    }
  }
  async execute({ dungeon }, user, message) {
    let [ , noun, which] = message.match(/^\/delete(?:\s+(\w+)\s*(.*))?$/)
    return await this.deleteThing(dungeon,noun, which)
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
      case ROOMS_NOUN:
        {
          let rooms = await dungeon.fetchRoomList()
          return Utility.makeMessages(rooms.map(room => `[${room.name()}] ${room.id()}`))
        }
      case USERS_NOUN:
        {
          let users = await dungeon.fetchUserList()
          return Utility.makeMessages(users.map(user => `[${user.name()}] ${user.id()}`))
        }
      default:
        {
          return Utility.makeMessage(`I don't see a list of '${things}' anywhere....`)
        }
    }
  }
}

class Look {
  async execute({ dungeon }, user) {
    let room = await dungeon.fetchResidence(user.id())
    return Utility.makeMessage(`[${room.name()}]: ${room.description()}`)
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
    if(room){
      await context.dungeon.placeUserInRoom(user.id(),room.id())
      return Utility.makeMessage(`Teleported to [${room.name()}].`)
    }else{
      return Utility.makeMessage(`You cannot teleport there.`)
    }
  }
}

class Hello {
  async execute(context, user, message) {
    let motd = Motd.fetchMotd()
    return {'messages': [...motd]}
  }
}

module.exports = { Create, Emote, List, Error, Look, Say, Teleport, Hello, Delete }
