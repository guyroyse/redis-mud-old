const chai = require('chai')
let expect = chai.expect

const sinon = require('sinon')
const sinonChai = require('sinon-chai')

chai.use(sinonChai)

const Session = require('../mud/session')

const WebSocket = require('ws')
const Context = require('../mud/context')
const TextController = require('../mud/text/text-controller')

describe("Session", function() {
  beforeEach(function() {
    sinon.stub(Context.prototype, 'load')
    sinon.stub(TextController.prototype, 'processStart')
    sinon.stub(TextController.prototype, 'processMessage')
    this.websocket = sinon.createStubInstance(WebSocket)

    this.subject = new Session(this.websocket)
  })

  afterEach(function() {
    sinon.restore()
  })

  context("when started", function() {
    beforeEach(function() {
      TextController.prototype.processStart.returns("some\nwelcome\nmessage")
      return this.subject.start()
    })

    it("loads the context", function() {
      expect(Context.prototype.load).to.have.been.called
    })

    it("starts the controller", function() {
      expect(TextController.prototype.processStart).to.have.been.calledWith(this.subject.context)
    })

    it("sends the start message to the websocker", function() {
      let expected = JSON.stringify({ messages: [ "some", "welcome", "message" ]})
      expect(this.websocket.send).to.have.been.calledWith(expected)
    })

    describe("#processMessage", function() {
      beforeEach(async function() {
        TextController.prototype.processMessage.returns("some response\nwith multiple lines")
        await this.subject.processMessage(JSON.stringify({ command: "some message" }))
      })

      it("processes the message", function() {
        expect(TextController.prototype.processMessage)
          .to.have.been.calledWith(this.subject.context, "some message")
      })

      it("sends the message response to the websocket", function() {
        let expected = JSON.stringify({ messages: [ "some response", "with multiple lines" ] })
        expect(this.websocket.send).to.have.been.calledWith(expected)
      })
    })
  })
})
