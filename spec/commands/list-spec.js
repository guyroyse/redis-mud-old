const chai = require('chai')
let expect = chai.expect

const sinon = require('sinon')
const sinonChai = require('sinon-chai')

chai.use(sinonChai)

const List = require('../../mud/commands/list')

const Dungeon = require('../../mud/things/dungeon')
const Room = require('../../mud/things/room')

describe("List", function() {

  beforeEach(function() {
    this.context = {
      dungeon: sinon.createStubInstance(Dungeon),
      room: sinon.createStubInstance(Room)
    }

    this.subject = new List()
  })

  context("when executed", function() {
    beforeEach(async function() {
      let rooms = [
        sinon.createStubInstance(Room),
        sinon.createStubInstance(Room),
        sinon.createStubInstance(Room)
      ]

      rooms[0].name.returns('the room')
      rooms[1].name.returns('the other room')
      rooms[2].name.returns('the back room')

      rooms[0].id.returns(23)
      rooms[1].id.returns(42)
      rooms[2].id.returns(13)

      this.context.dungeon.fetchRoomList.returns(rooms)
      this.context.room.description.returns('the description')
  
      this.response = await this.subject.execute(this.context, "/list")
    })

    it("list all the rooms", function() {
      expect(this.response).to.equal("[the room] 23\n[the other room] 42\n[the back room] 13")
    })
  })
})
