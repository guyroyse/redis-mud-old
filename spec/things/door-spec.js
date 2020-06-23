const RedisGraphShim = require('../../mud/data/redis-graph-shim')
const DoorQueries = require('../../mud/things/door-queries')
const { Door, Rooms } = require('../../mud/things/things')

describe("Door", function() {

  describe("#byId", function() {
    beforeEach(async function() {
      RedisGraphShim.prototype.executeAndReturnSingle
        .resolves([ A_DOOR_ID, A_DOOR_NAME, A_DOOR_DESCRIPTION ])
      this.result = await Door.byId(A_DOOR_ID)
    })

    it("askes the graph for the door", function() {
      expect(RedisGraphShim.prototype.executeAndReturnSingle)
        .to.have.been.calledWith(DoorQueries.FETCH_BY_ID, { id: A_DOOR_ID })
    })

    it("returns a room with expected properties", function() {
      expect(this.result.id).to.equal(A_DOOR_ID)
      expect(this.result.name).to.equal(A_DOOR_NAME)
      expect(this.result.description).to.equal(A_DOOR_DESCRIPTION)
    })
  })

  describe("#create", function() {
    beforeEach(async function() {
      RedisGraphShim.prototype.executeAndReturnSingle.resolves(
        [ A_DOOR_ID, A_DOOR_NAME, A_DOOR_DESCRIPTION ],
      )
      this.result = await Door.create(A_DOOR_NAME)
    })

    it("create the door", function() {
      expect(RedisGraphShim.prototype.executeAndReturnSingle)
        .to.have.been.calledWith(DoorQueries.CREATE, { 
          name: A_DOOR_NAME,
          description: 'This is a door.' })
    })

    it("returns a door with expected properties", function() {
      expect(this.result.id).to.equal(A_DOOR_ID)
      expect(this.result.name).to.equal(A_DOOR_NAME)
      expect(this.result.description).to.equal(A_DOOR_DESCRIPTION)
    })
  })

  context("when created", function() {
    beforeEach(function() {
      this.subject = new Door({
        id: A_DOOR_ID,
        name: A_DOOR_NAME,
        description: A_DOOR_DESCRIPTION })
    })
  
    it("has expected id", function() {
      expect(this.subject.id).to.equal(A_DOOR_ID)
    })
  
    it("has expected name", function() {
      expect(this.subject.name).to.equal(A_DOOR_NAME)
    })
  
    it("has expected description", function() {
      expect(this.subject.description).to.equal(A_DOOR_DESCRIPTION)
    })
  
    context("when renamed", function() {
      beforeEach(function() {
        this.subject.name = ANOTHER_DOOR_NAME
      })
  
      it("has the new name", function() {
        expect(this.subject.name).to.equal(ANOTHER_DOOR_NAME)
      })
  
      it("renames the room", function() {
        expect(RedisGraphShim.prototype.execute)
          .to.have.been.calledWith(DoorQueries.UPDATE, {
            id: A_DOOR_ID,
            name: ANOTHER_DOOR_NAME,
            description: A_DOOR_DESCRIPTION })
      })
    })
  
    context("when redescribed", function() {
      beforeEach(function() {
        this.subject.description = ANOTHER_DOOR_DESCRIPTION
      })
  
      it("has the new description", function() {
        expect(this.subject.description).to.equal(ANOTHER_DOOR_DESCRIPTION)
      })
  
      it("updates the room", function() {
        expect(RedisGraphShim.prototype.execute)
          .to.have.been.calledWith(DoorQueries.UPDATE, {
            id: A_DOOR_ID,
            name: A_DOOR_NAME,
            description: ANOTHER_DOOR_DESCRIPTION })
      })
    })
  
    describe("#destinations", function() {
      beforeEach(async function() {
        this.aRoom = createARoom()
        sinon.stub(Rooms, 'asDoorDestination')
        Rooms.asDoorDestination.resolves([this.aRoom, this.anotherRoom, this.aThirdRoom])
        this.rooms = await this.subject.destinations()
      })

      it("fetches the destination room from the dungeon", function() {
        expect(Rooms.asDoorDestination).to.have.been.calledWith(A_DOOR_ID)
      })
  
      it("returns the expected rooms", function() {
        expect(this.rooms).to.have.length(3)
        expect(this.rooms[0]).to.deep.equal(this.aRoom)
        expect(this.rooms[1]).to.deep.equal(this.anotherRoom)
        expect(this.rooms[2]).to.deep.equal(this.aThirdRoom)
      })
    })

    describe("#placeIn", function() {
      beforeEach(async function() {
        await this.subject.placeIn(A_ROOM_ID)
      })
  
      it("places the door in the room", function() {
        expect(RedisGraphShim.prototype.execute)
          .to.have.been.calledWith(DoorQueries.PLACE_IN, {
            id: A_DOOR_ID,
            roomId: A_ROOM_ID })
      })
    })
  
    describe("#addDestination", function() {
      beforeEach(async function() {
        await this.subject.addDestination(A_ROOM_ID)
      })
  
      it("adds the destination to the door", function() {
        expect(RedisGraphShim.prototype.execute)
          .to.have.been.calledWith(DoorQueries.ADD_DESTINATION, {
            id: A_DOOR_ID,
            roomId: A_ROOM_ID })
      })
    })
  })
})
