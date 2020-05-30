const chai = require('chai')
let expect = chai.expect

const sinon = require('sinon')
const sinonChai = require('sinon-chai')

chai.use(sinonChai)

const CommandProcessor = require('../../mud/text/text-controller')
const Dungeon = require('../../mud/things/dungeon')
const Room = require('../../mud/things/rooms/room')
const Door = require('../../mud/things/doors/door')

const CURRENT_ROOM_ID = 23
const CURRENT_ROOM_NAME = 'The Red Room'
const CURRENT_ROOM_DESCRIPTION = 'The Red Room is red.'

const A_DOOR_ID = 13
const A_DOOR_NAME = 'The Big Door'
const A_DOOR_DESCRIPTION = 'The Big Door is big'

const ANOTHER_DOOR_ID = 42
const ANOTHER_DOOR_NAME = 'The Bigger Door'
const ANOTHER_DOOR_DESCRIPTION = "It's even bigger"

xdescribe("Commands", function() {

  beforeEach(function() {
    this.context = {
      dungeon: sinon.createStubInstance(Dungeon),
      room: sinon.createStubInstance(Room)
    }

    this.context.room.id.returns(CURRENT_ROOM_ID)
    this.context.room.name.returns(CURRENT_ROOM_NAME)
    this.context.room.description.returns(CURRENT_ROOM_DESCRIPTION)

    this.aDoor = sinon.createStubInstance(Door)
    this.aDoor.id.returns(A_DOOR_ID)
    this.aDoor.name.returns(A_DOOR_NAME)
    this.aDoor.description.returns(A_DOOR_DESCRIPTION)

    this.anotherDoor = sinon.createStubInstance(Door)
    this.anotherDoor.id.returns(ANOTHER_DOOR_ID)
    this.anotherDoor.name.returns(ANOTHER_DOOR_NAME)
    this.anotherDoor.description.returns(ANOTHER_DOOR_DESCRIPTION)

    this.processor = new CommandProcessor()
  })

  describe("Look: /look", function() {
    context("when there are no doors", function() {
      beforeEach(async function() {
        this.context.room.doors.resolves([])
        this.response = await this.processor.processMessage(this.context, "/look")
      })
  
      it("returns the expected response", function() {
        expect(this.response).to.equal(CURRENT_ROOM_DESCRIPTION)
      })  
    })

    context("when there are doors", function() {
      beforeEach(async function() {
        this.context.room.doors.resolves([this.aDoor, this.anotherDoor])
        this.response = await this.processor.processMessage(this.context, "/look")
      })
  
      it("returns the expected response", function() {
        expect(ansiStrip(this.response)).to.equal(`${CURRENT_ROOM_DESCRIPTION}\nDoors: ${A_DOOR_NAME} [${A_DOOR_ID}], ${ANOTHER_DOOR_NAME} [${ANOTHER_DOOR_ID}]`)
      })  
    })
  })
})
