const chai = require('chai')
let expect = chai.expect

const sinon = require('sinon')
const sinonChai = require('sinon-chai')

chai.use(sinonChai)

const Mud = require('/mud')
const Session = Mud.Session
const MessageProcessor = Mud.MessageProcessor
const Room = Mud.Things.Room
const Dungeon = Mud.Things.Dungeon

const WebSocket = require('ws')

describe("Session", function() {
  beforeEach(function() {
    this.stubbedMessageProcessorInstance = sinon.createStubInstance(MessageProcessor)

    this.stubbedMessageProcessorClass = sinon.stub(Mud, 'MessageProcessor')
    this.stubbedMessageProcessorClass.returns(this.stubbedMessageProcessorInstance)

    this.stubbedWebSocket = sinon.createStubInstance(WebSocket)

    this.subject = new Session(this.stubbedWebSocket)
  })

  afterEach(function() {
    this.stubbedMessageProcessorClass.restore()
  })

  context("when started", function() {
    beforeEach(function() {
      this.stubbedRoom = sinon.createStubInstance(Room)

      this.stubbedDungeonInstance = sinon.createStubInstance(Dungeon)
      this.stubbedDungeonInstance.fetchOrCreateHub.returns(this.stubbedRoom)
  
      this.stubbedDungeonClass = sinon.stub(Mud.Things, 'Dungeon')
      this.stubbedDungeonClass.returns(this.stubbedDungeonInstance)

      return this.subject.start()
    })

    afterEach(function() {
      this.stubbedDungeonClass.restore()
    })

    it("opens the dungeon", function() {
      expect(this.stubbedDungeonInstance.open).to.have.been.calledWith('dungeon')
    })

    it("fetchs the current room", function() {
      expect(this.stubbedDungeonInstance.fetchOrCreateHub).to.have.been.called
    })

    it("it sends the message of the day", function() {

    })

    it("it sends a prompt", function() {

    })
  })
})
