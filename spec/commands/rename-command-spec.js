const chai = require('chai')
let expect = chai.expect

const sinon = require('sinon')
const sinonChai = require('sinon-chai')

chai.use(sinonChai)

const Rename = require('../../mud/commands/rename-command')
const Room = require('../../mud/things/room')

xdescribe("Rename", function() {

  beforeEach(function() {
    this.subject = new Rename()
  })

  context("when executed", function() {
    beforeEach(function() {
      this.room = sinon.createStubInstance(Room)
      this.response = this.subject.execute("/rename room The Fub", this.room)
    })

    it("renames the current room", function() {
      expect(this.room.name).to.have.been.calledWith("The Fub")
    })

    it("reports the rename", function() {
      expect(this.response).to.equal("Room renamed.")
    })
  })
})
