const chai = require('chai')
let expect = chai.expect

const sinon = require('sinon')
const sinonChai = require('sinon-chai')

chai.use(sinonChai)

const Mud = require('../mud')
const MessageProcessor = Mud.MessageProcessor
const Commands = Mud.Commands
const Room = Mud.Things.Room

describe("MessageProcessor", function() {

  beforeEach(function() {
    this.room = sinon.createStubInstance(Room)
    this.subject = new MessageProcessor()
  })

  let scenarios = [
    { clazz: 'Look', needsRoom: true, text: "/look" },
    { clazz: 'Emote', needsRoom: false, text: "/emote is eating food!" },
    { clazz: 'Describe', needsRoom: true, text: "/describe room It has a view." },
    { clazz: 'Error', needsRoom: false, text: "/error is not a valid command." },
    { clazz: 'Say', needsRoom: false, text: "I have a dream!" }
  ]

  scenarios.forEach(scenario => {
    let { clazz, needsRoom, text } = scenario

    context(`when processing a ${clazz} command`, function() {
      beforeEach(function() {
        this.stubbedInstance = sinon.createStubInstance(Commands[clazz])
        this.stubbedInstance.execute.returns("The command did a thing!")
    
        this.stubbedClass = sinon.stub(Commands, clazz)
        this.stubbedClass.returns(this.stubbedInstance)
  
        this.response = this.subject.processMessage(text, this.room)
      })
  
      afterEach(function() {
        this.stubbedClass.restore()
      })
  
      it("creates the command", function() {
        expect(this.stubbedClass).to.have.been.calledWithNew
        if (needsRoom) expect(this.stubbedClass).to.have.been.calledWith(this.room)
      })
    
      it("executes the command", function() {
        expect(this.stubbedInstance.execute).to.have.been.calledWith(text)
      })
  
      it("returns the response of the command", function() {
        expect(this.response).to.equal("The command did a thing!")
      })
    })
  })
})
