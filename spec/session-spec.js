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
    sinon.stub(Dungeon.prototype, 'open')
    sinon.stub(Dungeon.prototype, 'fetchOrCreateHub')

    this.stubbedWebSocket = sinon.createStubInstance(WebSocket)

    this.subject = new Session(this.stubbedWebSocket)
  })

  afterEach(function() {
    sinon.restore()
  })

  context("when started", function() {
    beforeEach(function() {
      this.stubbedRoom = sinon.createStubInstance(Room)
      this.stubbedRoom.name.returns("The Room")

      Dungeon.prototype.fetchOrCreateHub.returns(this.stubbedRoom)

      return this.subject.start()
    })

    it("opens the dungeon", function() {
      expect(Dungeon.prototype.open).to.have.been.calledWith('dungeon')
    })

    it("fetchs the current room", function() {
      expect(Dungeon.prototype.fetchOrCreateHub).to.have.been.called
    })

    it("it sends the message of the day and the prompt", function() {
      expect(this.stubbedWebSocket.send.firstCall)
        .to.have.been.calledWith("Welcome to RedisMUD!")
      expect(this.stubbedWebSocket.send.secondCall)
        .to.have.been.calledWith("Beware. You are likely to be eaten by a grue.")
      expect(this.stubbedWebSocket.send.thirdCall)
        .to.have.been.calledWith("")
      expect(this.stubbedWebSocket.send.getCall(3))
        .to.have.been.calledWith("You are in [The Room]")
    })

    context("when processing a message", function() {
      beforeEach(function() {
        this.stubbedWebSocket.send.resetHistory()
        MessageProcessor.prototype.processMessage.returns("some response")
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

      it("returns the response to the web socket", function() {
        expect(this.stubbedWebSocket.send.firstCall)
          .to.have.been.calledWith("")
        expect(this.stubbedWebSocket.send.secondCall)
          .to.have.been.calledWith("some response")
        expect(this.stubbedWebSocket.send.thirdCall)
          .to.have.been.calledWith("")
        expect(this.stubbedWebSocket.send.getCall(3))
          .to.have.been.calledWith("You are in [The Room]")
      })
    })

  })
})
