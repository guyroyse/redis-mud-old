const chai = require('chai')
let expect = chai.expect

const sinon = require('sinon')
const sinonChai = require('sinon-chai')

chai.use(sinonChai)

const Error = require('../../mud/commands/error-command')
const Room = require('../../mud/things/room')

describe("Error", function() {

  beforeEach(function() {
    this.subject = new Error()
  })

  context("when executed", function() {
    beforeEach(function() {
      this.room = sinon.createStubInstance(Room)
      this.response = this.subject.execute("/foo is so wrong", this.room)
    })

    it("displays the error message", function() {
      expect(this.response).to.equal("Invalid command '/foo is so wrong'")
    })
  })
})
