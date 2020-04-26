const chai = require('chai')
let expect = chai.expect

const sinon = require('sinon')
const sinonChai = require('sinon-chai')

chai.use(sinonChai)

const { Emote } = require('../../mud/commands')

const Dungeon = require('../../mud/things/dungeon')
const Room = require('../../mud/things/room')

describe("Emote", function() {

  beforeEach(function() {
    this.context = {
      dungeon: sinon.createStubInstance(Dungeon),
      room: sinon.createStubInstance(Room)
    }

    this.subject = new Emote()
  })

  context("when executed", function() {
    beforeEach(function() {
      this.response = this.subject.execute(this.context, "/emote did the thing.")
    })

    it("emotes the thing", function() {
      expect(this.response).to.equal("Player did the thing.")
    })
  })
})
