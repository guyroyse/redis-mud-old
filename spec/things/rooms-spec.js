const Dungeon = require('../../mud/things/dungeon')
const RedisGraphShim = require('../../mud/data/redis-graph-shim')
const Queries = require('../../mud/things/rooms/room-queries')

describe("Rooms", function() {
  beforeEach(function() {
    this.dungeon = new Dungeon()
    this.dungeon.open()
    this.subject = this.dungeon.rooms
  })

  describe("#fetchOrCreateHub", function() {
    beforeEach(async function() {
      RedisGraphShim.prototype.executeAndReturnSingle
        .resolves([ HUB_ID, HUB_NAME, HUB_DESCRIPTION ])
      this.result = await this.subject.fetchOrCreateHub()
    })

    it("askes the graph for the hub", function() {
      expect(RedisGraphShim.prototype.executeAndReturnSingle)
        .to.have.been.calledWith(Queries.FETCH_OR_CREATE_HUB, {
          name: HUB_NAME,
          description: HUB_DESCRIPTION })
    })

    it("returns a room with expected properties", function() {
      expect(this.result.id).to.equal(HUB_ID)
      expect(this.result.name).to.equal(HUB_NAME)
      expect(this.result.description).to.equal(HUB_DESCRIPTION)
    })
  })

  describe("#all", function() {
    beforeEach(async function() {
      RedisGraphShim.prototype.executeAndReturnMany.resolves([
        [ A_ROOM_ID, A_ROOM_NAME, A_ROOM_DESCRIPTION ],
        [ ANOTHER_ROOM_ID, ANOTHER_ROOM_NAME, ANOTHER_ROOM_DESCRIPTION ],
        [ A_THIRD_ROOM_ID, A_THIRD_ROOM_NAME, A_THIRD_ROOM_DESCRIPTION ]
      ])
      this.result = await this.subject.all()
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

  describe("#byId", function() {
    beforeEach(async function() {
      RedisGraphShim.prototype.executeAndReturnSingle
        .resolves([ A_ROOM_ID, A_ROOM_NAME, A_ROOM_DESCRIPTION ])
      this.result = await this.subject.byId(A_ROOM_ID)
    })

    it("askes the graph for the room", function() {
      expect(RedisGraphShim.prototype.executeAndReturnSingle)
        .to.have.been.calledWith(Queries.FETCH_BY_ID, { id: A_ROOM_ID })
    })

    it("returns a room with expected properties", function() {
      expect(this.result.id).to.equal(A_ROOM_ID)
      expect(this.result.name).to.equal(A_ROOM_NAME)
      expect(this.result.description).to.equal(A_ROOM_DESCRIPTION)
    })

  })

  describe("#asDoorDestination", function() {
    beforeEach(async function() {
      RedisGraphShim.prototype.executeAndReturnMany.resolves([
        [ A_ROOM_ID, A_ROOM_NAME, A_ROOM_DESCRIPTION ],
        [ ANOTHER_ROOM_ID, ANOTHER_ROOM_NAME, ANOTHER_ROOM_DESCRIPTION ],
        [ A_THIRD_ROOM_ID, A_THIRD_ROOM_NAME, A_THIRD_ROOM_DESCRIPTION ]
      ])
      this.result = await this.subject.asDoorDestination()
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

  describe("#create", function() {
    beforeEach(async function() {
      RedisGraphShim.prototype.executeAndReturnSingle
        .resolves([ A_ROOM_ID, A_ROOM_NAME, A_ROOM_DESCRIPTION ])
      this.result = await this.subject.create(A_ROOM_NAME)
    })

    it("creates the room", function() {
      expect(RedisGraphShim.prototype.executeAndReturnSingle)
        .to.have.been.calledWith(Queries.CREATE, { 
          name: A_ROOM_NAME,
          description: 'This is a room.' })
    })

    it("returns a room with expected properties", function() {
      expect(this.result.id).to.equal(A_ROOM_ID)
      expect(this.result.name).to.equal(A_ROOM_NAME)
      expect(this.result.description).to.equal(A_ROOM_DESCRIPTION)
    })
  })

  describe("#update", function() {
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
