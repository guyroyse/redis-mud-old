const Command = require('../../../mud/text/commands/command')

const { Say, Emote, Describe, Rename, List, Error, Teleport } = require('../../../mud/text/commands')

const { Create } = require('../../../mud/text/commands/create')
const { Edit } = require('../../../mud/text/commands/edit')
const Use = require('../../../mud/text/commands/use')
const Look = require('../../../mud/text/commands/look')


describe("Command", function() {
  beforeEach(function() {
    this.context = createStubContext()
    this.subject = new Command()
  })

  describe("#execute", function() {
    context("when processing commands", function() {

      let scenarios = [
        { command: 'say what?', delegateClass: Say },
        { command: '/emote', delegateClass: Emote }, 
        { command: '/look', delegateClass: Look }, 
        { command: '/create', delegateClass: Create }, 
        { command: '/list', delegateClass: List }, 
        { command: '/teleport', delegateClass: Teleport },
        { command: '/use', delegateClass: Use },
        { command: '/edit', delegateClass: Edit },
        { command: '/foo bar', delegateClass: Error }
      ]

      scenarios.forEach(scenario => {
        let { command, delegateClass } = scenario 

        beforeEach(async function() {
          sinon.stub(delegateClass.prototype, 'execute')
          delegateClass.prototype.execute.resolves('a message')
          this.response = await this.subject.execute(this.context, command)
        })

        it("executes the command on the expected class", function() {
          expect(delegateClass.prototype.execute).to.have.been.calledWith(this.context, command)
        })

        it("returns the message", function() {
          expect(this.response).to.equal('a message')
        })
      })
    })
  })
})
