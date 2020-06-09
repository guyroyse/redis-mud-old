const TextController = require('../../mud/text/text-controller')

const Motd = require('../../mud/text/motd')
const Prompt = require('../../mud/text/prompt')
const Command = require('../../mud/text/commands/command')

describe("TextController", function() {
  beforeEach(function() {
    sinon.stub(Motd.prototype, 'fetchMotd')
    sinon.stub(Prompt.prototype, 'fetchPrompt')
    sinon.stub(Command.prototype, 'execute')

    Motd.prototype.fetchMotd.returns("a message")
    Prompt.prototype.fetchPrompt.returns("a prompt")
    Command.prototype.execute.resolves("a result")

    this.context = createStubContext()
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
    context("when processing a command", function() {
      beforeEach(async function() {
        this.response = await this.subject.processMessage(this.context, "a command")
      })

      it("executes the command on the expected class", function() {
        expect(Command.prototype.execute).to.have.been.calledWith(this.context, "a command")
      })

      it("returns the message and the prompt", function() {
        expect(this.response).to.equal('a result\na prompt')
      })
    })

    context("when processing command with surrounding whitespace", function() {
      beforeEach(async function() {
        this.response = await this.subject.processMessage(this.context, "   a command\t\t\n\n  ")
      })

      it("executes strips the whitespace before invoking the command", function() {
        expect(Command.prototype.execute).to.have.been.calledWith(this.context, "a command")
      })

      it("returns the message and the prompt", function() {
        expect(this.response).to.equal('a result\na prompt')
      })
    })
  })
})
