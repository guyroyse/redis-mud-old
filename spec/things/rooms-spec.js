const RedisGraphShim = require('../../mud/data/redis-graph-shim')
const Queries = require('../../mud/things/rooms/room-queries')
const Rooms = require('../../mud/things/rooms/rooms')

describe("Rooms", function() {

  describe("#all", function() {
    beforeEach(async function() {
      RedisGraphShim.prototype.executeAndReturnMany.resolves([
        [ A_ROOM_ID, A_ROOM_NAME, A_ROOM_DESCRIPTION ],
        [ ANOTHER_ROOM_ID, ANOTHER_ROOM_NAME, ANOTHER_ROOM_DESCRIPTION ],
        [ A_THIRD_ROOM_ID, A_THIRD_ROOM_NAME, A_THIRD_ROOM_DESCRIPTION ]
      ])
      this.result = await Rooms.all()
    })

    it("fetches the rooms", function() {
      expect(RedisGraphShim.prototype.executeAndReturnMany)
        .to.have.been.calledWith(Queries.FETCH_ALL)
    })

    it("returns all the rooms", function() {
      expect(this.result).to.have.lengthOf(3)

      expect(this.result[0].id).to.equal(A_ROOM_ID)
      expect(this.result[0].name).to.equal(A_ROOM_NAME)
      expect(this.result[0].description).to.equal(A_ROOM_DESCRIPTION)

      expect(this.result[1].id).to.equal(ANOTHER_ROOM_ID)
      expect(this.result[1].name).to.equal(ANOTHER_ROOM_NAME)
      expect(this.result[1].description).to.equal(ANOTHER_ROOM_DESCRIPTION)

      expect(this.result[2].id).to.equal(A_THIRD_ROOM_ID)
      expect(this.result[2].name).to.equal(A_THIRD_ROOM_NAME)
      expect(this.result[2].description).to.equal(A_THIRD_ROOM_DESCRIPTION)
    })
  })

  describe("#asDoorDestination", function() {
    beforeEach(async function() {
      RedisGraphShim.prototype.executeAndReturnMany.resolves([
        [ A_ROOM_ID, A_ROOM_NAME, A_ROOM_DESCRIPTION ],
        [ ANOTHER_ROOM_ID, ANOTHER_ROOM_NAME, ANOTHER_ROOM_DESCRIPTION ],
        [ A_THIRD_ROOM_ID, A_THIRD_ROOM_NAME, A_THIRD_ROOM_DESCRIPTION ]
      ])
      this.result = await Rooms.asDoorDestination()
    })

    it("fetches the rooms", function() {
      expect(RedisGraphShim.prototype.executeAndReturnMany)
        .to.have.been.calledWith(Queries.FETCH_AS_DOOR_DESTINATION)
    })

    it("returns all the rooms", function() {
      expect(this.result).to.have.lengthOf(3)

      expect(this.result[0].id).to.equal(A_ROOM_ID)
      expect(this.result[0].name).to.equal(A_ROOM_NAME)
      expect(this.result[0].description).to.equal(A_ROOM_DESCRIPTION)

      expect(this.result[1].id).to.equal(ANOTHER_ROOM_ID)
      expect(this.result[1].name).to.equal(ANOTHER_ROOM_NAME)
      expect(this.result[1].description).to.equal(ANOTHER_ROOM_DESCRIPTION)

      expect(this.result[2].id).to.equal(A_THIRD_ROOM_ID)
      expect(this.result[2].name).to.equal(A_THIRD_ROOM_NAME)
      expect(this.result[2].description).to.equal(A_THIRD_ROOM_DESCRIPTION)
    })
  })




  xdescribe("#update", function() {
    beforeEach(async function() {
      await this.subject.update(A_ROOM_ID, A_ROOM_NAME, A_ROOM_DESCRIPTION)
    })

    it("updates the room", function() {
      expect(RedisGraphShim.prototype.execute)
        .to.have.been.calledWith(Queries.UPDATE, {
          id: A_ROOM_ID,
          name: A_ROOM_NAME,
          description: A_ROOM_DESCRIPTION })
    })
  })
})
