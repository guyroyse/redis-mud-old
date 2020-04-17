const chai = require('chai')
let expect = chai.expect

const sinon = require('sinon')
const sinonChai = require('sinon-chai')

chai.use(sinonChai)

const Create = require('../../mud/commands/create')

const Dungeon = require('../../mud/things/dungeon')
const Room = require('../../mud/things/room')

xdescribe("Create", function() {

  beforeEach(function() {
    this.context = {
      dungeon: sinon.createStubInstance(Dungeon),
      room: sinon.createStubInstance(Room)
    }

    this.subject = new Create()
  })

  context("when executed", function() {
    beforeEach(function() {
      this.response = this.subject.execute(this.context, "/create room The Blue Room")
    })

    it("creates the room")

    it("reports the creation", function() {
      expect(this.response).to.equal("Room created with ID: foobar")
    })
  })
})
