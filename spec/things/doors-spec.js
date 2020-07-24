const RedisGraphShim = require('../../mud/data/redis-graph-shim')
const DoorQueries = require('../../mud/things/door-queries')
const { Doors } = require('../../mud/things/things')

describe("Doors", function() {
  describe("#inRoom", function() {
    beforeEach(async function() {
      RedisGraphShim.prototype.executeAndReturnMany.resolves([
        createADoorMap(), createAnotherDoorMap(), createAThirdDoorMap()
      ])
      this.doors = await Doors.inRoom(CURRENT_ROOM_ID)
    })

    it("fetches the doors for the room id", function() {
      expect(RedisGraphShim.prototype.executeAndReturnMany)
        .to.have.been.calledWith(DoorQueries.IN_ROOM, { roomId: CURRENT_ROOM_ID })
    })

    it("returns the doors with expected properties", function() {
      expect(this.doors).to.have.lengthOf(3)

      expect(this.doors[0].id).to.equal(A_DOOR_ID)
      expect(this.doors[0].name).to.equal(A_DOOR_NAME)
      expect(this.doors[0].description).to.equal(A_DOOR_DESCRIPTION)

      expect(this.doors[1].id).to.equal(ANOTHER_DOOR_ID)
      expect(this.doors[1].name).to.equal(ANOTHER_DOOR_NAME)
      expect(this.doors[1].description).to.equal(ANOTHER_DOOR_DESCRIPTION)

      expect(this.doors[2].id).to.equal(A_THIRD_DOOR_ID)
      expect(this.doors[2].name).to.equal(A_THIRD_DOOR_NAME)
      expect(this.doors[2].description).to.equal(A_THIRD_DOOR_DESCRIPTION)
    })
  })
})
