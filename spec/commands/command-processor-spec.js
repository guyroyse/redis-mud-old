const chai = require('chai')
const bluebird = require('bluebird')
let expect = chai.expect

const sinon = require('sinon')
const sinonChai = require('sinon-chai')
const User = require('../../mud/things/user')

chai.use(sinonChai)

const CommandProcessor = require('../../mud/commands/command-processor')

const { Say, Error } = require('../../mud/commands/commands')

const Context = require('../../mud/context')

describe("CommandProcessor", function() {

  beforeEach(function() {
    this.context = new Context()
    this.user = new User(null,{ id: '1', name: 'one'})
    this.subject = new CommandProcessor()
  })

  context("when processing a bare command", function() {
    beforeEach(async function() {
      sinon.stub(Say.prototype, 'execute')
      sinon.stub(Context.prototype, 'authenticate').usingPromise(bluebird.Promise).resolves(this.user)

      let message = JSON.stringify({"auth":"1","message":"     This command has whitespace\t\t\n\n       "})
  
      await this.subject.processMessage(this.context, message)
    })

    afterEach(function() {
      sinon.restore()
    })

    it("trims the whitespace before executing the command", function() {
      expect(Say.prototype.execute).to.have.been.calledWith(this.context, this.user, "This command has whitespace")
    })
  })

  context("when processing a slash command", function() {
    beforeEach(async function() {
      sinon.stub(Error.prototype, 'execute')
      sinon.stub(Context.prototype, 'authenticate').usingPromise(bluebird.Promise).resolves(this.user)
      let message = JSON.stringify({"auth":"1","message":"  /foo is not a command\t\t\n\n  "})
      await this.subject.processMessage(this.context, message)
    })

    afterEach(function() {
      sinon.restore()
    })

    it("trims the whitespace before executing the command", function() {
      expect(Error.prototype.execute).to.have.been.calledWith(this.context, this.user, "/foo is not a command")
    })
  })
})
