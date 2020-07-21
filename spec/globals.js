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
const { Door, Room, User } = require('../mud/things/things')
const { password } = require('../mud/config')

global.createStubContext = (room) => {
  let context = sinon.createStubInstance(Context)
  context.room = room
  return context
}

global.createStubDoor = (id, name, description) => {
  let door = sinon.createStubInstance(Door)
  door.name = name
  door.description = description
  sinon.stub(door, 'id').get(() => id)
  sinon.spy(door, 'name', ['get', 'set'])
  sinon.spy(door, 'description', ['get', 'set'])
  return door
}

global.createStubRoom = (id, name, description) => {
  let room = sinon.createStubInstance(Room)
  room.name = name
  room.description = description
  sinon.stub(room, 'id').get(() => id)
  sinon.spy(room, 'name', ['get', 'set'])
  sinon.spy(room, 'description', ['get', 'set'])
  return room
}

global.createStubUser = (id, password) => {
  let user = sinon.createStubInstance(User)
  user.id = id
  user.password = password
}

global.HUB_ID = 0
global.HUB_NAME = 'The Hub'
global.HUB_DESCRIPTION = 'Huge hub is huge'

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
global.A_DOOR_DESTINATION = 13
global.createADoor = () => createStubDoor(A_DOOR_ID, A_DOOR_NAME, A_DOOR_DESCRIPTION, A_DOOR_DESTINATION)

global.ANOTHER_DOOR_ID = 230
global.ANOTHER_DOOR_NAME = 'The Bigger Door'
global.ANOTHER_DOOR_DESCRIPTION = "It's even bigger"
global.ANOTHER_DOOR_DESTINATION = 23
global.createAnotherDoor = () => createStubDoor(ANOTHER_DOOR_ID, ANOTHER_DOOR_NAME, ANOTHER_DOOR_DESCRIPTION, ANOTHER_DOOR_DESTINATION)

global.A_THIRD_DOOR_ID = 420
global.A_THIRD_DOOR_NAME = 'The Biggest Door'
global.A_THIRD_DOOR_DESCRIPTION = "It's the biggest"
global.A_THIRD_DOOR_DESTINATION = 23
global.createAThirdDoor = () => createStubDoor(A_THIRD_DOOR_ID, A_THIRD_DOOR_NAME, A_THIRD_DOOR_DESCRIPTION, A_THIRD_DOOR_DESTINATION)

global.A_USER_ID = 'alice'
global.A_USER_PASSWORD = 'foo'
global.createAUser = () => createStubUser(A_USER_ID, A_USER_PASSWORD)

global.ANOTHER_USER_ID = 'bob'
global.ANOTHER_USER_PASSWORD = 'bar'
global.createAnotherDoor = () => createStubUser(ANOTHER_USER_ID, ANOTHER_USER_PASSWORD)

global.A_THIRD_USER_ID = 'chuck'
global.A_THIRD_USER_PASSWORD = 'baz'
global.createAThirdDoor = () => createStubUser(A_THIRD_USER_ID, A_THIRD_USER_PASSWORD)
