const Dungeon = require('../../mud/things/dungeon')
const RedisGraphShim = require('../../mud/data/redis-graph-shim')
const Queries = require('../../mud/things/doors/door-queries')

describe("Doors", function() {
  beforeEach(function() {
    this.dungeon = new Dungeon()
    this.dungeon.open()
    this.subject = this.dungeon.doors
  })

  describe("#inRoom", function() {
    beforeEach(async function() {
      RedisGraphShim.prototype.executeAndReturnMany.resolves([
        [ A_DOOR_ID, A_DOOR_NAME, A_DOOR_DESCRIPTION ],
        [ ANOTHER_DOOR_ID, ANOTHER_DOOR_NAME, ANOTHER_DOOR_DESCRIPTION ],
        [ A_THIRD_DOOR_ID, A_THIRD_DOOR_NAME, A_THIRD_DOOR_DESCRIPTION ]
      ])
      this.doors = await this.subject.inRoom(CURRENT_ROOM_ID)
    })

    it("fetches the doors for the room id", function() {
      expect(RedisGraphShim.prototype.executeAndReturnMany)
        .to.have.been.calledWith(Queries.IN_ROOM, { roomId: CURRENT_ROOM_ID })
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

  describe("#create", function() {
    beforeEach(async function() {
      RedisGraphShim.prototype.executeAndReturnSingle.resolves(
        [ A_DOOR_ID, A_DOOR_NAME, A_DOOR_DESCRIPTION ],
      )
      this.result = await this.subject.create(A_DOOR_NAME, CURRENT_ROOM_ID)
    })

    it("create the door", function() {
      expect(RedisGraphShim.prototype.executeAndReturnSingle)
        .to.have.been.calledWith(Queries.CREATE, { 
          name: A_DOOR_NAME,
          description: 'This is a door.', 
          containingRoom: CURRENT_ROOM_ID })
    })

    it("returns a door with expected properties", function() {
      expect(this.result.id).to.equal(A_DOOR_ID)
      expect(this.result.name).to.equal(A_DOOR_NAME)
      expect(this.result.description).to.equal(A_DOOR_DESCRIPTION)
    })
  })

  describe("#createTo", function() {
    beforeEach(async function() {
      RedisGraphShim.prototype.executeAndReturnSingle.resolves(
        [ A_DOOR_ID, A_DOOR_NAME, A_DOOR_DESCRIPTION, A_DOOR_DESTINATION ],
      )
      this.result = await this.subject.createTo(A_DOOR_NAME, CURRENT_ROOM_ID, A_DOOR_DESTINATION)
    })

    it("create the door", function() {
      expect(RedisGraphShim.prototype.executeAndReturnSingle)
        .to.have.been.calledWith(Queries.CREATE_TO, { 
          name: A_DOOR_NAME,
          description: 'This is a door.',
          containingRoom: CURRENT_ROOM_ID,
          destinationRoom: A_DOOR_DESTINATION })
    })

    it("returns a door with expected properties", function() {
      expect(this.result.id).to.equal(A_DOOR_ID)
      expect(this.result.name).to.equal(A_DOOR_NAME)
      expect(this.result.description).to.equal(A_DOOR_DESCRIPTION)
    })
  })

  describe("#update", function() {
    beforeEach(async function() {
      await this.subject.update(A_DOOR_ID, A_DOOR_NAME, A_DOOR_DESCRIPTION)
    })

    it("updates the room", function() {
      expect(RedisGraphShim.prototype.execute)
        .to.have.been.calledWith(Queries.UPDATE, {
          id: A_DOOR_ID,
          name: A_DOOR_NAME,
          description: A_DOOR_DESCRIPTION })
    })
  })
})
