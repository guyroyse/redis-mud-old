const chai = require('chai')
let expect = chai.expect

const sinon = require('sinon')
const sinonChai = require('sinon-chai')

chai.use(sinonChai)

const Create = require('../../mud/commands/create')

const Dungeon = require('../../mud/things/dungeon')
const Room = require('../../mud/things/room')

describe("Create", function() {

  beforeEach(function() {
    this.context = {
      dungeon: sinon.createStubInstance(Dungeon),
      room: sinon.createStubInstance(Room)
    }

    this.subject = new Create()
  })

  context("when executed", function() {
    beforeEach(async function() {
      this.context.dungeon.createRoom.returns(42)
      this.response = await this.subject.execute(this.context, "/create room The Blue Room")
    })

    it("creates the room", function() {
      expect(this.context.dungeon.createRoom).to.have.been.calledWith("The Blue Room")
    })

    it("reports the creation", function() {
      expect(this.response).to.equal("Room 'The Blue Room' created with ID of 42.")
    })
  })
})
