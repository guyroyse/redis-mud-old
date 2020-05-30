const TextController = require('../../mud/text/text-controller')

const Motd = require('../../mud/text/motd')
const Prompt = require('../../mud/text/prompt')

const { Say, Emote, Look, Describe, Rename, Create, List, Error, Teleport } =
  require('../../mud/text/commands')

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
    context("when processing commands", function() {

      let scenarios = [
        { command: 'say what?', clazz: Say },
        { command: '/emote', clazz: Emote }, 
        { command: '/look', clazz: Look }, 
        { command: '/describe', clazz: Describe }, 
        { command: '/rename', clazz: Rename }, 
        { command: '/create', clazz: Create }, 
        { command: '/list', clazz: List }, 
        { command: '/teleport', clazz: Teleport },
        { command: '/foo bar', clazz: Error }
      ]

      scenarios.forEach(scenario => {
        let { command, clazz } = scenario 

        beforeEach(async function() {
          sinon.stub(clazz.prototype, 'execute')
          clazz.prototype.execute.resolves('a message')
          this.response = await this.subject.processMessage(this.context, command)
        })

        it("executes the command on the expected class", function() {
          expect(clazz.prototype.execute).to.have.been.calledWith(this.context, command)
        })

        it("returns the message and the prompt", function() {
          expect(this.response).to.equal('a message\na prompt')
        })
      })
    })

    context("when processing command with whitespace", function() {
      context("when processing a bare command", function() {
        beforeEach(async function() {
          sinon.stub(Say.prototype, 'execute')
          Say.prototype.execute.resolves('a message')
      
          this.response = await this.subject.processMessage(this.context, "  This command has whitespace\t\t\n\n  ")
        })
    
        it("trims the whitespace before executing the command", function() {
          expect(Say.prototype.execute).to.have.been.calledWith(this.context, "This command has whitespace")
        })
  
        it("returns the message and the prompt", function() {
          expect(this.response).to.equal('a message\na prompt')
        })
      })
    
      context("when processing a slash command", function() {
        beforeEach(async function() {
          sinon.stub(Error.prototype, 'execute')
          Error.prototype.execute.resolves('an error')
  
          this.response = await this.subject.processMessage(this.context, "  /foo is not a command\t\t\n\n  ")
        })
    
        it("trims the whitespace before executing the command", function() {
          expect(Error.prototype.execute).to.have.been.calledWith(this.context, "/foo is not a command")
        })

        it("returns the message and the prompt", function() {
          expect(this.response).to.equal('an error\na prompt')
        })
      })
    })  
  })
})
