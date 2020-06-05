const { Use } = require('../../../mud/text/commands')

describe("Use", function() {
  beforeEach(function() {
    this.dungeon = createStubDungeon()
    this.currentRoom = createCurrentRoom()
    this.context = createStubContext(this.dungeon, this.currentRoom)

    this.aDoor = createADoor()
    this.anotherDoor = createAnotherDoor()
    this.aThirdDoor = createAThirdDoor()

    this.aRoom = createARoom()
    this.anotherRoom = createAnotherRoom()
    this.aThirdRoom = createAThirdRoom()

    this.subject = new Use()
  })

  describe(`/use ${A_DOOR_ID}`, function() {
    context("when the door has no destination", function() {
      beforeEach(async function() {
        this.context.room.doors.resolves([this.aDoor, this.anotherDoor, this.aThirdDoor])
        this.aDoor.destinations.resolves([])
        this.response = stripAnsi(await this.subject.execute(this.context, `/use ${A_DOOR_ID}`))
      })
  
      it("does not update the context with the new room", function() {
        expect(this.context.room).to.equal(this.currentRoom)
      })
  
      it("returns the expected response", function() {
        expect(this.response).to.equal(`This door won\'t open. Perhaps it needs a key?`)
      })
    })

    context("when the door has a single destination", function() {
      beforeEach(async function() {
        this.context.room.doors.resolves([this.aDoor, this.anotherDoor, this.aThirdDoor])
        this.aDoor.destinations.resolves([this.aRoom])
        this.response = stripAnsi(await this.subject.execute(this.context, `/use ${A_DOOR_ID}`))
      })
  
      it("update the context with the new room", function() {
        expect(this.context.room).to.equal(this.aRoom)
      })
  
      it("returns the expected response", function() {
        expect(this.response).to.equal(`You moved.`)
      })
    })
  })
})
