const chai = require('chai')
let expect = chai.expect

const sinon = require('sinon')
const sinonChai = require('sinon-chai')

chai.use(sinonChai)

const { Rename } = require('../../mud/commands')

const Dungeon = require('../../mud/things/dungeon')
const Room = require('../../mud/things/room')

describe("Rename", function() {

  beforeEach(function() {
    this.context = {
      dungeon: sinon.createStubInstance(Dungeon),
      room: sinon.createStubInstance(Room)
    }

    this.subject = new Rename()
  })

  context("when executed", function() {
    beforeEach(function() {
      this.response = this.subject.execute(this.context, "/rename room The Fub")
    })

    it("renames the current room", function() {
      expect(this.context.room.name).to.have.been.calledWith("The Fub")
    })

    it("reports the rename", function() {
      expect(this.response).to.equal("Room renamed.")
    })
  })
})
