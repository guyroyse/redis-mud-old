const bluebird = require('bluebird')
const chai = require('chai')
let expect = chai.expect

const sinon = require('sinon')
const sinonChai = require('sinon-chai')

chai.use(sinonChai)

const CommandProcessor = require('../../mud/commands/command-processor')
const Dungeon = require('../../mud/things/dungeon')
const Room = require('../../mud/things/room')
const User = require('../../mud/things/user')
const Context = require('../../mud/context')

describe("Commands", function() {

  beforeEach(function() {
    this.context = new Context()
    this.user = new User(null,{ id: '1', name: 'one'})
    this.processor = new CommandProcessor()
    sinon.stub(Context.prototype, 'authenticate').usingPromise(bluebird.Promise).resolves(this.user)
  })

  this.afterEach(function(){
    sinon.restore()
  })

  describe("Create: /create", function () {
    beforeEach(
      async function () {
        let message = JSON.stringify({"auth":"1","message":"/create"})
        this.response = await this.processor.processMessage(this.context, this.user, message)
    })

    it("doesn't know what yer talking about", function () {
      expect(this.response.messages[0]).to.equal("If you need help, try 'create [TYPE_OF_THING] [NAME_OF_THING]'")
    })  

  })

  describe("Create: /create room", function () {
    beforeEach(
      async function () {
        let message = JSON.stringify({"auth":"1","message":"/create room"})
        this.response = await this.processor.processMessage(this.context, this.user, message)
    })

    it("doesn't know what yer talking about", function () {
      expect(this.response.messages[0]).to.equal("Things need names, there, bud!")
    })  

  })

  describe("Create: /create window Rear Window", function () {
    beforeEach(
      async function () {
        let message = JSON.stringify({"auth":"1","message":"/create window Rear Window"})
        this.response = await this.processor.processMessage(this.context, this.user, message)
    })

    it("doesn't know what yer talking about", function () {
      expect(this.response.messages[0]).to.equal("Sorry, I don't do windows :)!")
    })  

  })

  describe("Create: /create macguffin Maltese Falcon", function () {
    beforeEach(
      async function () {
        let message = JSON.stringify({"auth":"1","message":"/create macguffin Maltese Falcon"})
        this.response = await this.processor.processMessage(this.context, this.user, message)
    })

    it("doesn't know what yer talking about", function () {
      expect(this.response.messages[0]).to.equal("I don't know how to create a 'macguffin'.")
    })  

  })
    describe("Create: /create room The Blue Room", function () {
    beforeEach(async function() {
      this.context.dungeon = sinon.createStubInstance(Dungeon)
      this.context.dungeon.createRoom.returns({"id":()=>42})
      let message = JSON.stringify({"auth":"1","message":"/create room The Blue Room"})
      this.response = await this.processor.processMessage(this.context, this.user, message)
    })

    it("creates the room", function() {
      expect(this.context.dungeon.createRoom).to.have.been.calledWith("The Blue Room")
    })

    it("returns the expected response", function() {
      expect(this.response.messages[0]).to.equal("Room 'The Blue Room' created with ID of 42.")
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

      this.context.dungeon = sinon.createStubInstance(Dungeon)
      this.context.dungeon.fetchRoomList.returns(rooms)

      let message = JSON.stringify({"auth":"1","message":"/list"})
      this.response = await this.processor.processMessage(this.context, this.user, message)
    })

    it("returns the expected response", function() {
      expect(this.response.messages[0]).to.equal("[the room] 23")
      expect(this.response.messages[1]).to.equal("[the other room] 42")
      expect(this.response.messages[2]).to.equal("[the back room] 13")
    })
  })

  describe("Teleport: /teleport 42", function() {
    beforeEach(async function() {
      this.returnedRoom = sinon.createStubInstance(Room)
      this.returnedRoom.name.returns('the room')
      this.context.dungeon = sinon.createStubInstance(Dungeon)
      this.context.dungeon.fetchRoom.returns(this.returnedRoom)

      let message = JSON.stringify({"auth":"1","message":"/teleport 42"})
      this.response = await this.processor.processMessage(this.context, this.user, message)
    })

    it("fetches room 42", function() {
      expect(this.context.dungeon.fetchRoom).to.have.been.calledWith(42)
    })

    it("returns the expected response", function() {
      expect(this.response.messages[0]).to.equal("Teleported to [the room].")
    })
  })

  let scenarios = [
    { commandName: "Say", 
      command: "the message",
      response: "You said: the message" },
    { commandName: "Emote",
      command: "/emote did a thing!",
      response: "one did a thing!" },
    { commandName: "Error",
      command: "/foo is so wrong!",
      response: "Invalid command '/foo is so wrong!'" }
  ]

  scenarios.forEach(scenario => {
    let { commandName, command, response } = scenario

    describe(`${commandName}: ${command}`, function() {
      beforeEach(async function() {
        let message = JSON.stringify({"auth":"1","message":command})
        this.response = await this.processor.processMessage(this.context, this.user, message)
      })

      it("returns the expected response", function() {
        expect(this.response.messages[0]).to.equal(response)
      })
    })
  })
})
