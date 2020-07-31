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
  door.id = id
  door.name = name
  door.description = description
  return door
}

global.createStubRoom = (id, name, description) => {
  let room = sinon.createStubInstance(Room)
  room.id = id
  room.name = name
  room.description = description
  return room
}

global.createStubUser = (id, name, password) => {
  let user = sinon.createStubInstance(User)
  user.id = id
  user.name = name
  user.password = password
  return user
}

global.HUB_ID = 0
global.HUB_NAME = 'The Hub'
global.HUB_DESCRIPTION = 'Huge hub is huge'
global.createHubMap = () => createRoomMap(HUB_ID, HUB_NAME, HUB_DESCRIPTION)

global.CURRENT_ROOM_ID = 1
global.CURRENT_ROOM_NAME = 'The Red Room'
global.CURRENT_ROOM_DESCRIPTION = 'The Red Room is red.'
global.createCurrentRoom = () => createStubRoom(CURRENT_ROOM_ID, CURRENT_ROOM_NAME, CURRENT_ROOM_DESCRIPTION)
global.createCurrentRoomMap = () => createRoomMap(CURRENT_ROOM_ID, CURRENT_ROOM_NAME, CURRENT_ROOM_DESCRIPTION)

global.A_ROOM_ID = 13
global.A_ROOM_NAME = 'The Red Room'
global.A_ROOM_DESCRIPTION = 'The Red Room is red.'
global.createARoom = () => createStubRoom(A_ROOM_ID, A_ROOM_NAME, A_ROOM_DESCRIPTION)
global.createARoomMap = () => createRoomMap(A_ROOM_ID, A_ROOM_NAME, A_ROOM_DESCRIPTION)

global.ANOTHER_ROOM_ID = 23
global.ANOTHER_ROOM_NAME = 'The Blue Room'
global.ANOTHER_ROOM_DESCRIPTION = 'The Blue Room is big.'
global.createAnotherRoom = () => createStubRoom(ANOTHER_ROOM_ID, ANOTHER_ROOM_NAME, ANOTHER_ROOM_DESCRIPTION)
global.createAnotherRoomMap = () => createRoomMap(ANOTHER_ROOM_ID, ANOTHER_ROOM_NAME, ANOTHER_ROOM_DESCRIPTION)

global.A_THIRD_ROOM_ID = 42
global.A_THIRD_ROOM_NAME = 'The Green Room'
global.A_THIRD_ROOM_DESCRIPTION = 'The Green Room is occupied.'
global.createAThirdRoom = () => createStubRoom(A_THIRD_ROOM_ID, A_THIRD_ROOM_NAME, A_THIRD_ROOM_DESCRIPTION)
global.createAThirdRoomMap = () => createRoomMap(A_THIRD_ROOM_ID, A_THIRD_ROOM_NAME, A_THIRD_ROOM_DESCRIPTION)

function createRoomMap(id, name, description) {
  let map = new Map()
  map.set('id', id)
  map.set('name', name)
  map.set('description', description)
  return map
}

global.A_DOOR_ID = 130
global.A_DOOR_NAME = 'The Big Door'
global.A_DOOR_DESCRIPTION = 'The Big Door is big'
global.A_DOOR_DESTINATION = 13
global.createADoor = () => createStubDoor(A_DOOR_ID, A_DOOR_NAME, A_DOOR_DESCRIPTION, A_DOOR_DESTINATION)
global.createADoorMap = () => createDoorMap(A_DOOR_ID, A_DOOR_NAME, A_DOOR_DESCRIPTION)

global.ANOTHER_DOOR_ID = 230
global.ANOTHER_DOOR_NAME = 'The Bigger Door'
global.ANOTHER_DOOR_DESCRIPTION = "It's even bigger"
global.ANOTHER_DOOR_DESTINATION = 23
global.createAnotherDoor = () => createStubDoor(ANOTHER_DOOR_ID, ANOTHER_DOOR_NAME, ANOTHER_DOOR_DESCRIPTION, ANOTHER_DOOR_DESTINATION)
global.createAnotherDoorMap = () => createDoorMap(ANOTHER_DOOR_ID, ANOTHER_DOOR_NAME, ANOTHER_DOOR_DESCRIPTION)

global.A_THIRD_DOOR_ID = 420
global.A_THIRD_DOOR_NAME = 'The Biggest Door'
global.A_THIRD_DOOR_DESCRIPTION = "It's the biggest"
global.A_THIRD_DOOR_DESTINATION = 23
global.createAThirdDoor = () => createStubDoor(A_THIRD_DOOR_ID, A_THIRD_DOOR_NAME, A_THIRD_DOOR_DESCRIPTION, A_THIRD_DOOR_DESTINATION)
global.createAThirdDoorMap = () => createDoorMap(A_THIRD_DOOR_ID, A_THIRD_DOOR_NAME, A_THIRD_DOOR_DESCRIPTION)

function createDoorMap(id, name, description) {
  let map = new Map()
  map.set('id', id)
  map.set('name', name)
  map.set('description', description)
  return map
}

global.A_USER_ID = 111
global.A_USER_NAME = 'alice'
global.A_USER_PASSWORD = 'foo'
global.createAUser = () => createStubUser(A_USER_ID, A_USER_NAME, A_USER_PASSWORD)
global.createAUserMap = () => createUserMap(A_USER_ID, A_USER_NAME, A_USER_PASSWORD)

global.ANOTHER_USER_ID = 222
global.ANOTHER_USER_NAME = 'bob'
global.ANOTHER_USER_PASSWORD = 'bar'
global.createAnotherUser = () => createStubUser(ANOTHER_USER_ID, ANOTHER_USER_NAME, ANOTHER_USER_PASSWORD)
global.createAnotherUserMap = () => createUserMap(ANOTHER_USER_ID, ANOTHER_USER_NAME, ANOTHER_USER_PASSWORD)

global.A_THIRD_USER_ID = 333
global.A_THIRD_USER_NAME = 'chuck'
global.A_THIRD_USER_PASSWORD = 'baz'
global.createAThirdUser = () => createStubUser(A_THIRD_USER_ID, A_THIRD_USER_NAME, A_THIRD_USER_PASSWORD)
global.createAThirdUserMap = () => createUserMap(A_THIRD_USER_ID, A_THIRD_USER_NAME, A_THIRD_USER_PASSWORD)

function createUserMap(id, name, password) {
  let map = new Map()
  map.set('id', id)
  map.set('name', name)
  map.set('password', password)
  return map
}
