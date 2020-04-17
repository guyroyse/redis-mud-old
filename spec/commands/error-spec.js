const chai = require('chai')
let expect = chai.expect

const sinon = require('sinon')
const sinonChai = require('sinon-chai')

chai.use(sinonChai)

const Error = require('../../mud/commands/error')

const Dungeon = require('../../mud/things/dungeon')
const Room = require('../../mud/things/room')

describe("Error", function() {

  beforeEach(function() {
    this.context = {
      dungeon: sinon.createStubInstance(Dungeon),
      room: sinon.createStubInstance(Room)
    }

    this.subject = new Error()
  })

  context("when executed", function() {
    beforeEach(function() {
      this.response = this.subject.execute(this.context, "/foo is so wrong")
    })

    it("displays the error message", function() {
      expect(this.response).to.equal("Invalid command '/foo is so wrong'")
    })
  })
})
