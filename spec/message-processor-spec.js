const chai = require('chai')
let expect = chai.expect

const sinon = require('sinon')
const sinonChai = require('sinon-chai')

chai.use(sinonChai)

const MessageProcessor = require('../mud/message-processor')

const Say = require('../mud/commands/say')
const Emote = require('../mud/commands/emote')
const Look = require('../mud/commands/look')
const Describe = require('../mud/commands/describe')
const Rename = require('../mud/commands/rename')
const Create = require('../mud/commands/create')
const List = require('../mud/commands/list')
const Error = require('../mud/commands/error')
const Teleport = require('../mud/commands/teleport')

describe("MessageProcessor", function() {

  beforeEach(function() {
    this.context = "some object"
    this.subject = new MessageProcessor()
  })

  let scenarios = [
    { clazz: Say, clazzName: 'Say', text: "I have a dream!" },
    { clazz: Emote, clazzName: 'Emote', text: "/emote is eating food!" },
    { clazz: Look, clazzName: 'Look', text: "/look" },
    { clazz: Describe, clazzName: 'Describe', text: "/describe room It has a view." },
    { clazz: Rename, clazzName: 'Rename', text: "/rename room Room with a View" },
    { clazz: Create, clazzName: 'Create', text: "/create room The Back Room" },
    { clazz: Error, clazzName: 'Error', text: "/error is not a valid command." },
    { clazz: List, clazzName: 'List', text: "/list rooms"},
    { clazz: Teleport, clazzName: 'Teleport', text: "/teleport room 42"}
  ]

  scenarios.forEach(scenario => {
    let { clazz, clazzName, text } = scenario

    context(`when processing a ${clazzName} command`, function() {
      beforeEach(async function() {
        sinon.stub(clazz.prototype, 'execute')
        clazz.prototype.execute.returns("The command did a thing!")
    
        this.response = await this.subject.processMessage(this.context, text)
      })
  
      afterEach(function() {
        sinon.restore()
      })
  
      it("executes the command", function() {
        expect(clazz.prototype.execute).to.have.been.calledWith(this.context, text)
      })
  
      it("returns the response of the command", function() {
        expect(this.response).to.equal("The command did a thing!")
      })
    })
  })
})
