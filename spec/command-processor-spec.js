const chai = require('chai')
let expect = chai.expect

const sinon = require('sinon')
const sinonChai = require('sinon-chai')

chai.use(sinonChai)

const CommandProcessor = require('../mud/command-processor')

const { Say, Error } = require('../mud/commands')

describe("CommandProcessor", function() {

  beforeEach(function() {
    this.context = "some object"
    this.subject = new CommandProcessor()
  })

  context("when processing a bare command", function() {
    beforeEach(async function() {
      sinon.stub(Say.prototype, 'execute')
  
      await this.subject.processMessage(this.context, "  This command has whitespace\t\t\n\n  ")
    })

    afterEach(function() {
      sinon.restore()
    })

    it("trims the whitespace before executing the command", function() {
      expect(Say.prototype.execute).to.have.been.calledWith(this.context, "This command has whitespace")
    })
  })

  context("when processing a slash command", function() {
    beforeEach(async function() {
      sinon.stub(Error.prototype, 'execute')
      await this.subject.processMessage(this.context, "  /foo is not a command\t\t\n\n  ")
    })

    afterEach(function() {
      sinon.restore()
    })

    it("trims the whitespace before executing the command", function() {
      expect(Error.prototype.execute).to.have.been.calledWith(this.context, "/foo is not a command")
    })
  })
})
