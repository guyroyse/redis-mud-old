const chai = require('chai')
const sinon = require('sinon')
const sinonChai = require('sinon-chai')

chai.use(sinonChai)

global.expect = chai.expect
global.sinon = sinon 

const stripAnsi = require('strip-ansi')
global.stripAnsi = stripAnsi

const Context = require('../mud/context')
global.createStubContext = (dungeon, room) => {
  let context = sinon.createStubInstance(Context)
  sinon.stub(context, 'dungeon').get(() => dungeon)
  sinon.stub(context, 'room').get(() => room)
  return context
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
  sinon.stub(room, 'id').get(() => id)
  sinon.stub(room, 'name').get(() => name)
  sinon.stub(room, 'description').get(() => description)
  return room
}