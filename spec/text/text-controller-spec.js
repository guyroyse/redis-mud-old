const TextController = require('../../mud/text/text-controller')

const Motd = require('../../mud/text/motd')
const Prompt = require('../../mud/text/prompt')
const { Say, Error } = require('../../mud/text/commands')

describe("TextController", function() {
  beforeEach(function() {
    sinon.stub(Motd.prototype, 'fetchMotd')
    sinon.stub(Prompt.prototype, 'fetchPrompt')

    Motd.prototype.fetchMotd.returns("a message")
    Prompt.prototype.fetchPrompt.returns("a prompt")

    this.context = "some object"
    this.subject = new TextController()
  })

  describe("#processStart", function() {
    beforeEach(function() {
      this.result = this.subject.processStart(this.context)
    })

    it("fetches the motd", function() {
      expect(Motd.prototype.fetchMotd).to.have.been.called
    })

    it("fetches the prompt", function() {
      expect(Prompt.prototype.fetchPrompt).to.have.been.calledWith(this.context)
    })

    it("returns the message and the prompt", function() {
      expect(this.result).to.equal("a message\na prompt")
    })
  })

  describe("#processMessage", function() {
    context("when processing a bare command", function() {
      beforeEach(async function() {
        sinon.stub(Say.prototype, 'execute')
    
        await this.subject.processMessage(this.context, "  This command has whitespace\t\t\n\n  ")
      })
  
      it("trims the whitespace before executing the command", function() {
        expect(Say.prototype.execute).to.have.been.calledWith(this.context, "This command has whitespace")
      })

      it("returns the command response")
      it("returns the prompt")
    })
  
    context("when processing a slash command", function() {
      beforeEach(async function() {
        sinon.stub(Error.prototype, 'execute')
        await this.subject.processMessage(this.context, "  /foo is not a command\t\t\n\n  ")
      })
  
      it("maps to correct commands")

      it("trims the whitespace before executing the command", function() {
        expect(Error.prototype.execute).to.have.been.calledWith(this.context, "/foo is not a command")
      })

      it("returns the command response")
      it("returns the prompt")
    })
  })
})
