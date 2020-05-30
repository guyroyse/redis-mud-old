const Room = require('../../mud/things/rooms/room')

describe("Room", function() {
  beforeEach(function() {
    this.dungeon = createStubDungeon()
    this.subject = new Room(this.dungeon, {
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

    it("renames the room", function() {
      expect(this.dungeon.rooms.update)
        .to.have.been.calledWith(A_ROOM_ID, ANOTHER_ROOM_NAME, A_ROOM_DESCRIPTION)
    })
  })

  context("when redescribed", function() {
    beforeEach(function() {
      this.subject.description = ANOTHER_ROOM_DESCRIPTION
    })

    it("has the new description", function() {
      expect(this.subject.description).to.equal(ANOTHER_ROOM_DESCRIPTION)
    })

    it("updates the room", function() {
      expect(this.dungeon.rooms.update)
        .to.have.been.calledWith(A_ROOM_ID, A_ROOM_NAME, ANOTHER_ROOM_DESCRIPTION)
    })
  })

  context("when fetching doors in the room", function() {
    beforeEach(async function() {
      this.aDoor = createADoor()
      this.anotherDoor = createAnotherDoor()
      this.aThirdDoor = createAThirdDoor()

      this.dungeon.doors.inRoom.resolves([this.aDoor, this.anotherDoor, this.aThirdDoor])
      this.doors = await this.subject.doors()
    })

    it("fetches the doors from the dungeon", function() {
      expect(this.dungeon.doors.inRoom).to.have.been.calledWith(A_ROOM_ID)
    })

    it("returns the expected doors", function() {
      expect(this.doors).to.have.lengthOf(3)
      expect(this.doors[0]).to.equal(this.aDoor)
      expect(this.doors[1]).to.equal(this.anotherDoor)
      expect(this.doors[2]).to.equal(this.aThirdDoor)
    })
  })
})
