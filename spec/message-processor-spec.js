const chai = require('chai')
let expect = chai.expect

const sinon = require('sinon')
const sinonChai = require('sinon-chai')

chai.use(sinonChai)

const MessageProcessor = require('../mud/message-processor')
const Look = require('../mud/commands/look-command')
const Emote = require('../mud/commands/emote-command')
const Describe = require('../mud/commands/describe-command')
const Rename = require('../mud/commands/rename-command')
const Error = require('../mud/commands/error-command')
const Say = require('../mud/commands/say-command')
const Room = require('../mud/things/room')

describe("MessageProcessor", function() {

  beforeEach(function() {
    this.room = sinon.createStubInstance(Room)
    this.subject = new MessageProcessor()
  })

  let scenarios = [
    { clazz: Look, clazzName: 'Look', text: "/look" },
    { clazz: Emote, clazzName: 'Emote', text: "/emote is eating food!" },
    { clazz: Describe, clazzName: 'Describe', text: "/describe room It has a view." },
    { clazz: Rename, clazzName: 'Rename', text: "/rename room Room with a View" },
    { clazz: Error, clazzName: 'Error', text: "/error is not a valid command." },
    { clazz: Say, clazzName: 'Say', text: "I have a dream!" }
  ]

  scenarios.forEach(scenario => {
    let { clazz, clazzName, text } = scenario

    context(`when processing a ${clazzName} command`, function() {
      beforeEach(function() {
        sinon.stub(clazz.prototype, 'execute')
        clazz.prototype.execute.returns("The command did a thing!")
    
        this.response = this.subject.processMessage(text, this.room)
      })
  
      afterEach(function() {
        sinon.restore()
      })
  
      it("executes the command", function() {
        expect(clazz.prototype.execute).to.have.been.calledWith(text, this.room)
      })
  
      it("returns the response of the command", function() {
        expect(this.response).to.equal("The command did a thing!")
      })
    })
  })
})
