const RedisGraphShim = require('../../mud/data/redis-graph-shim')
const RoomQueries = require('../../mud/things/room-queries')
const { Room, Doors } = require('../../mud/things/things')

describe("Room", function() {

  describe("#hub", function() {
    beforeEach(async function() {
      RedisGraphShim.prototype.executeAndReturnSingle.resolves([ HUB_ID, HUB_NAME, HUB_DESCRIPTION ])
      this.result = await Room.hub()
    })

    it("askes the graph for the hub", function() {
      expect(RedisGraphShim.prototype.executeAndReturnSingle)
        .to.have.been.calledWith(RoomQueries.FETCH_OR_CREATE_HUB, {
          name: HUB_NAME,
          description: HUB_DESCRIPTION })
    })

    it("returns a room with expected properties", function() {
      expect(this.result.id).to.equal(HUB_ID)
      expect(this.result.name).to.equal(HUB_NAME)
      expect(this.result.description).to.equal(HUB_DESCRIPTION)
    })
  })

  describe("#byId", function() {
    beforeEach(async function() {
      RedisGraphShim.prototype.executeAndReturnSingle
        .resolves([ A_ROOM_ID, A_ROOM_NAME, A_ROOM_DESCRIPTION ])
      this.result = await Room.byId(A_ROOM_ID)
    })

    it("askes the graph for the room", function() {
      expect(RedisGraphShim.prototype.executeAndReturnSingle)
        .to.have.been.calledWith(RoomQueries.FETCH_BY_ID, { id: A_ROOM_ID })
    })

    it("returns a room with expected properties", function() {
      expect(this.result.id).to.equal(A_ROOM_ID)
      expect(this.result.name).to.equal(A_ROOM_NAME)
      expect(this.result.description).to.equal(A_ROOM_DESCRIPTION)
    })
  })

  describe("#create", function() {
    beforeEach(async function() {
      RedisGraphShim.prototype.executeAndReturnSingle
        .resolves([ A_ROOM_ID, A_ROOM_NAME, A_ROOM_DESCRIPTION ])
      this.result = await Room.create(A_ROOM_NAME)
    })

    it("creates the room", function() {
      expect(RedisGraphShim.prototype.executeAndReturnSingle)
        .to.have.been.calledWith(RoomQueries.CREATE, { 
          name: A_ROOM_NAME,
          description: 'This is a room.' })
    })

    it("returns a room with expected properties", function() {
      expect(this.result.id).to.equal(A_ROOM_ID)
      expect(this.result.name).to.equal(A_ROOM_NAME)
      expect(this.result.description).to.equal(A_ROOM_DESCRIPTION)
    })
  })

  context("when created", function() {
    beforeEach(function() {
      this.subject = new Room({
        id: A_ROOM_ID,
        name: A_ROOM_NAME,
        description: A_ROOM_DESCRIPTION })
    })
  
    it("has expected id", function() {
      expect(this.subject.id).to.equal(A_ROOM_ID)
    })
  
    it("has expected name", function() {
      expect(this.subject.name).to.equal(A_ROOM_NAME)
    })
  
    it("has expected description", function() {
      expect(this.subject.description).to.equal(A_ROOM_DESCRIPTION)
    })
  
    context("when renamed", function() {
      beforeEach(function() {
        this.subject.name = ANOTHER_ROOM_NAME
      })
  
      it("has the new name", function() {
        expect(this.subject.name).to.equal(ANOTHER_ROOM_NAME)
      })
  
      it("updates the graph", function() {
        expect(RedisGraphShim.prototype.execute)
          .to.have.been.calledWith(RoomQueries.UPDATE, {
            id: A_ROOM_ID,
            name: ANOTHER_ROOM_NAME,
            description: A_ROOM_DESCRIPTION
          })
      })
    })
  
    context("when redescribed", function() {
      beforeEach(function() {
        this.subject.description = ANOTHER_ROOM_DESCRIPTION
      })
  
      it("has the new description", function() {
        expect(this.subject.description).to.equal(ANOTHER_ROOM_DESCRIPTION)
      })
  
      it("updates the graph", function() {
        expect(RedisGraphShim.prototype.execute)
          .to.have.been.calledWith(RoomQueries.UPDATE, {
            id: A_ROOM_ID,
            name: A_ROOM_NAME,
            description: ANOTHER_ROOM_DESCRIPTION
          })
      })
    })
  
    context("when fetching doors in the room", function() {
      beforeEach(async function() {
        sinon.stub(Doors, 'inRoom')

        this.aDoor = createADoor()
        this.anotherDoor = createAnotherDoor()
        this.aThirdDoor = createAThirdDoor()
  
        Doors.inRoom.resolves([this.aDoor, this.anotherDoor, this.aThirdDoor])
        this.doors = await this.subject.doors()
      })
  
      it("returns the expected doors", function() {
        expect(this.doors).to.have.lengthOf(3)
        expect(this.doors[0]).to.equal(this.aDoor)
        expect(this.doors[1]).to.equal(this.anotherDoor)
        expect(this.doors[2]).to.equal(this.aThirdDoor)
      })
    })  
  })
})
