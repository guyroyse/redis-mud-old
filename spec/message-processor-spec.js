const chai = require('chai')
let expect = chai.expect

const sinon = require('sinon')
const sinonChai = require('sinon-chai')

chai.use(sinonChai)

const Mud = require('../mud')
const MessageProcessor = Mud.MessageProcessor
const Room = Mud.Things.Room

describe("MessageProcessor", function() {

  beforeEach(function() {
    this.room = sinon.createStubInstance(Room)
    this.subject = new MessageProcessor()
  })

})
