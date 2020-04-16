const chai = require('chai')
let expect = chai.expect

const sinon = require('sinon')
const sinonChai = require('sinon-chai')

chai.use(sinonChai)

const Session = require('../mud/session')
const MessageProcessor = require('../mud/message-processor')
const Room = require('../mud/things/room')
const Dungeon = require('../mud/things/dungeon')

const WebSocket = require('ws')

describe("Session", function() {
  beforeEach(function() {
    sinon.stub(MessageProcessor.prototype, 'processMessage')

    this.stubbedWebSocket = sinon.createStubInstance(WebSocket)

    this.subject = new Session(this.stubbedWebSocket)
  })

  afterEach(function() {
    sinon.restore()
  })

  context("when started", function() {
    beforeEach(function() {
      this.stubbedRoom = sinon.createStubInstance(Room)

      sinon.stub(Dungeon.prototype, 'open')
      sinon.stub(Dungeon.prototype, 'fetchOrCreateHub')
      Dungeon.prototype.fetchOrCreateHub.returns(this.stubbedRoom)

      return this.subject.start()
    })

    afterEach(function() {
      sinon.restore()
    })

    it("opens the dungeon", function() {
      expect(Dungeon.prototype.open).to.have.been.calledWith('dungeon')
    })

    it("fetchs the current room", function() {
      expect(Dungeon.prototype.fetchOrCreateHub).to.have.been.called
    })

    it("it sends the message of the day")

    it("it sends a prompt")

    context("when processing a message", function() {
      beforeEach(function() {
        this.subject.processMessage("some message")
      })

      it("invokes the processor in the expected way", function() {
        let expectedContext = { 
          currentRoom: this.stubbedRoom,
          dungeon: this.subject.dungeon
        }

        expect(MessageProcessor.prototype.processMessage)
          .to.have.been.calledWith(expectedContext, "some message")
      })

      it("returns the response to the web socket")
      it("it sends a prompt")
    })

  })
})
