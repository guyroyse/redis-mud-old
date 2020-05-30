/* Sinon & Chai requirements */

const chai = require('chai')
const sinon = require('sinon')
const sinonChai = require('sinon-chai')

chai.use(sinonChai)

global.expect = chai.expect
global.sinon = sinon 

/* Sometimes you need to strip some ANSI */

const stripAnsi = require('strip-ansi')
global.stripAnsi = stripAnsi

/* Stubbed Test Objects */

const Context = require('../mud/context')
global.createStubContext = (dungeon, room) => {
  let context = sinon.createStubInstance(Context)
  sinon.stub(context, 'dungeon').get(() => dungeon)
  sinon.stub(context, 'room').get(() => room)
  return context
}

const Dungeon = require('../mud/things/dungeon')
const Doors = require('../mud/things/doors/doors')
const Rooms = require('../mud/things/rooms/rooms')
global.createStubDungeon = () => {
  let doors = sinon.createStubInstance(Doors)
  let rooms = sinon.createStubInstance(Rooms)
  let dungeon = sinon.createStubInstance(Dungeon)
  sinon.stub(dungeon, 'doors').get(() => doors)
  sinon.stub(dungeon, 'rooms').get(() => rooms)
  return dungeon
}

const Door = require('../mud/things/doors/door')
global.createStubDoor = (id, name, description) => {
  let door = sinon.createStubInstance(Door)
  sinon.stub(door, 'id').get(() => id)
  sinon.stub(door, 'name').get(() => name)
  sinon.stub(door, 'description').get(() => description)
  return door
}

const Room = require('../mud/things/rooms/room')
global.createStubRoom = (id, name, description) => {
  let room = sinon.createStubInstance(Room)
  room.name = name
  room.description = description
  sinon.stub(room, 'id').get(() => id)
  sinon.spy(room, 'name', ['get', 'set'])
  sinon.spy(room, 'description', ['get', 'set'])
  return room
}

global.CURRENT_ROOM_ID = 1
global.CURRENT_ROOM_NAME = 'The Red Room'
global.CURRENT_ROOM_DESCRIPTION = 'The Red Room is red.'
global.createCurrentRoom = () => createStubRoom(CURRENT_ROOM_ID, CURRENT_ROOM_NAME, CURRENT_ROOM_DESCRIPTION)

global.A_ROOM_ID = 13
global.A_ROOM_NAME = 'The Red Room'
global.A_ROOM_DESCRIPTION = 'The Red Room is red.'
global.createARoom = () => createStubRoom(A_ROOM_ID, A_ROOM_NAME, A_ROOM_DESCRIPTION)

global.ANOTHER_ROOM_ID = 23
global.ANOTHER_ROOM_NAME = 'The Blue Room'
global.ANOTHER_ROOM_DESCRIPTION = 'The Blue Room is big.'
global.createAnotherRoom = () => createStubRoom(ANOTHER_ROOM_ID, ANOTHER_ROOM_NAME, ANOTHER_ROOM_DESCRIPTION)

global.A_THIRD_ROOM_ID = 42
global.A_THIRD_ROOM_NAME = 'The Green Room'
global.A_THIRD_ROOM_DESCRIPTION = 'The Green Room is occupied.'
global.createAThirdRoom = () => createStubRoom(A_THIRD_ROOM_ID, A_THIRD_ROOM_NAME, A_THIRD_ROOM_DESCRIPTION)

global.A_DOOR_ID = 130
global.A_DOOR_NAME = 'The Big Door'
global.A_DOOR_DESCRIPTION = 'The Big Door is big'
global.createADoor = () => createStubDoor(A_DOOR_ID, A_DOOR_NAME, A_DOOR_DESCRIPTION)

global.ANOTHER_DOOR_ID = 230
global.ANOTHER_DOOR_NAME = 'The Bigger Door'
global.ANOTHER_DOOR_DESCRIPTION = "It's even bigger"
global.createAnotherDoor = () => createStubDoor(ANOTHER_DOOR_ID, ANOTHER_DOOR_NAME, ANOTHER_DOOR_DESCRIPTION)

global.A_THIRD_DOOR_ID = 420
global.A_THIRD_DOOR_NAME = 'The Biggest Door'
global.A_THIRD_DOOR_DESCRIPTION = "It's the biggest"
global.createAThirdDoor = () => createStubDoor(A_THIRD_DOOR_ID, A_THIRD_DOOR_NAME, A_THIRD_DOOR_DESCRIPTION)
