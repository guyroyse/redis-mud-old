const chai = require('chai')
let expect = chai.expect

const sinon = require('sinon')
const sinonChai = require('sinon-chai')

chai.use(sinonChai)

const Session = require('../mud/session')

const WebSocket = require('ws')
const Context = require('../mud/context')
const Motd = require('../mud/motd')
const Prompt = require('../mud/prompt')
const MessageProcessor = require('../mud/message-processor')

describe("Session", function() {
  beforeEach(function() {
    sinon.stub(Context.prototype, 'start')
    sinon.stub(Motd.prototype, 'fetchMotd')
    sinon.stub(Prompt.prototype, 'fetchPrompt')
    sinon.stub(MessageProcessor.prototype, 'processMessage')
    this.websocket = sinon.createStubInstance(WebSocket)

    this.subject = new Session(this.websocket)
  })

  afterEach(function() {
    sinon.restore()
  })

  context("when started", function() {
    beforeEach(function() {
      Motd.prototype.fetchMotd.returns(["some motd"])
      Prompt.prototype.fetchPrompt.returns(["some prompt"])
      return this.subject.start()
    })

    it("starts the context", function() {
      expect(Context.prototype.start).to.have.been.called
    })

    it("it sends the message of the day and the prompt", function() {
      expect(this.websocket.send.firstCall).to.have.been.calledWith("some motd")
      expect(this.websocket.send.secondCall).to.have.been.calledWith("some prompt")
    })

    describe("#processMessage", function() {
      beforeEach(function() {
        this.websocket.send.resetHistory()
        MessageProcessor.prototype.processMessage.returns(["some response"])
        this.subject.processMessage("some message")
      })

      it("invokes the message processor", function() {
        expect(MessageProcessor.prototype.processMessage)
          .to.have.been.calledWith(this.subject.context, "some message")
      })

      it("returns the response to the web socket", function() {
        expect(this.websocket.send.firstCall).to.have.been.calledWith("some response")
        expect(this.websocket.send.secondCall).to.have.been.calledWith("some prompt")
      })
    })
  })
})
