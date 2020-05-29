const chai = require('chai')
let expect = chai.expect

const sinon = require('sinon')
const sinonChai = require('sinon-chai')

chai.use(sinonChai)

const CommandProcessor = require('../../mud/commands/command-processor')
const Dungeon = require('../../mud/things/dungeon')
const Room = require('../../mud/things/room')

const CURRENT_ROOM_ID = 23
const CURRENT_ROOM_NAME = 'The Red Room'
const CURRENT_ROOM_DESCRIPTION = 'The Red Room is red.'

describe("Commands", function() {

  beforeEach(function() {
    this.context = {
      dungeon: sinon.createStubInstance(Dungeon),
      room: sinon.createStubInstance(Room)
    }

    this.context.room.id.returns(CURRENT_ROOM_ID)
    this.context.room.name.returns(CURRENT_ROOM_NAME)
    this.context.room.description.returns(CURRENT_ROOM_DESCRIPTION)

    this.processor = new CommandProcessor()
  })

  describe("Describe: /describe room This room is big and ugly.", function() {
    beforeEach(async function() {
      this.response = await this.processor.processMessage(this.context, "/describe room This room is big and ugly.")
    })

    it("redescribes the current room", function() {
      expect(this.context.room.description).to.have.been.calledWith("This room is big and ugly.")
    })

    it("returns the expected response", function() {
      expect(this.response).to.equal("Room description updated.")
    })
  })

  context("Rename: /rename room The Fub", function() {
    beforeEach(async function() {
      this.response = await this.processor.processMessage(this.context, "/rename room The Fub")
    })

    it("renames the current room", function() {
      expect(this.context.room.name).to.have.been.calledWith("The Fub")
    })

    it("returns the expected response", function() {
      expect(this.response).to.equal("Room renamed.")
    })
  })

  describe("List: /list", function() {
    beforeEach(async function() {
      let rooms = [
        sinon.createStubInstance(Room),
        sinon.createStubInstance(Room),
        sinon.createStubInstance(Room)
      ]

      rooms[0].name.returns('the room')
      rooms[1].name.returns('the other room')
      rooms[2].name.returns('the back room')

      rooms[0].id.returns(23)
      rooms[1].id.returns(42)
      rooms[2].id.returns(13)

      this.context.dungeon.fetchRoomList.returns(rooms)
      this.context.room.description.returns('the description')
  
      this.response = await this.processor.processMessage(this.context, "/list")
    })

    it("returns the expected response", function() {
      expect(this.response).to.equal("[the room] 23\n[the other room] 42\n[the back room] 13")
    })
  })

  describe("Teleport: /teleport 42", function() {
    beforeEach(async function() {
      this.returnedRoom = sinon.createStubInstance(Room)
      this.returnedRoom.name.returns('the room')
      this.context.dungeon.fetchRoom.returns(this.returnedRoom)

      this.response = await this.processor.processMessage(this.context, "/teleport 42")
    })

    it("fetches room 42", function() {
      expect(this.context.dungeon.fetchRoom).to.have.been.calledWith(42)
    })

    it("update the context with the new room", function() {
      expect(this.context.room).to.equal(this.returnedRoom)
    })

    it("returns the expected response", function() {
      expect(this.response).to.equal("Teleported to [the room].")
    })
  })

  let scenarios = [
    { commandName: "Say", 
      command: "the message",
      response: "You said: the message" },
    { commandName: "Emote",
      command: "/emote did a thing!",
      response: "Player did a thing!" },
    { commandName: "Error",
      command: "/foo is so wrong!",
      response: "Invalid command '/foo is so wrong!'" }
  ]

  scenarios.forEach(scenario => {
    let { commandName, command, response } = scenario

    describe(`${commandName}: ${command}`, function() {
      beforeEach(async function() {
        this.response = await this.processor.processMessage(this.context, command)
      })

      it("returns the expected response", function() {
        expect(this.response).to.equal(response)
      })
    })
  })
})
