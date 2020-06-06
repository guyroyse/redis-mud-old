const RedisGraphShim = require('../../mud/data/redis-graph-shim')
const RoomQueries = require('../../mud/things/room-queries')
const { Rooms } = require('../../mud/things/things')

describe("Rooms", function() {
  describe("#all", function() {
    beforeEach(async function() {
      RedisGraphShim.prototype.executeAndReturnMany.resolves([
        [ A_ROOM_ID, A_ROOM_NAME, A_ROOM_DESCRIPTION ],
        [ ANOTHER_ROOM_ID, ANOTHER_ROOM_NAME, ANOTHER_ROOM_DESCRIPTION ],
        [ A_THIRD_ROOM_ID, A_THIRD_ROOM_NAME, A_THIRD_ROOM_DESCRIPTION ]
      ])
      this.rooms = await Rooms.all()
    })

    it("fetches the rooms", function() {
      expect(RedisGraphShim.prototype.executeAndReturnMany)
        .to.have.been.calledWith(RoomQueries.FETCH_ALL)
    })

    it("returns all the rooms", function() {
      expect(this.rooms).to.have.lengthOf(3)

      expect(this.rooms[0].id).to.equal(A_ROOM_ID)
      expect(this.rooms[0].name).to.equal(A_ROOM_NAME)
      expect(this.rooms[0].description).to.equal(A_ROOM_DESCRIPTION)

      expect(this.rooms[1].id).to.equal(ANOTHER_ROOM_ID)
      expect(this.rooms[1].name).to.equal(ANOTHER_ROOM_NAME)
      expect(this.rooms[1].description).to.equal(ANOTHER_ROOM_DESCRIPTION)

      expect(this.rooms[2].id).to.equal(A_THIRD_ROOM_ID)
      expect(this.rooms[2].name).to.equal(A_THIRD_ROOM_NAME)
      expect(this.rooms[2].description).to.equal(A_THIRD_ROOM_DESCRIPTION)
    })
  })

  describe("#asDoorDestination", function() {
    beforeEach(async function() {
      RedisGraphShim.prototype.executeAndReturnMany.resolves([
        [ A_ROOM_ID, A_ROOM_NAME, A_ROOM_DESCRIPTION ],
        [ ANOTHER_ROOM_ID, ANOTHER_ROOM_NAME, ANOTHER_ROOM_DESCRIPTION ],
        [ A_THIRD_ROOM_ID, A_THIRD_ROOM_NAME, A_THIRD_ROOM_DESCRIPTION ]
      ])
      this.rooms = await Rooms.asDoorDestination()
    })

    it("fetches the rooms", function() {
      expect(RedisGraphShim.prototype.executeAndReturnMany)
        .to.have.been.calledWith(RoomQueries.FETCH_AS_DOOR_DESTINATION)
    })

    it("returns all the rooms", function() {
      expect(this.rooms).to.have.lengthOf(3)

      expect(this.rooms[0].id).to.equal(A_ROOM_ID)
      expect(this.rooms[0].name).to.equal(A_ROOM_NAME)
      expect(this.rooms[0].description).to.equal(A_ROOM_DESCRIPTION)

      expect(this.rooms[1].id).to.equal(ANOTHER_ROOM_ID)
      expect(this.rooms[1].name).to.equal(ANOTHER_ROOM_NAME)
      expect(this.rooms[1].description).to.equal(ANOTHER_ROOM_DESCRIPTION)

      expect(this.rooms[2].id).to.equal(A_THIRD_ROOM_ID)
      expect(this.rooms[2].name).to.equal(A_THIRD_ROOM_NAME)
      expect(this.rooms[2].description).to.equal(A_THIRD_ROOM_DESCRIPTION)
    })
  })
})
