const { Create } = require('../../../mud/text/commands')

const DESTINATION_ROOM_ID = 23

describe("Create", function() {
  beforeEach(function() {
    this.dungeon = createStubDungeon()
    this.currentRoom = createCurrentRoom()
    this.context = createStubContext(this.dungeon, this.currentRoom)

    this.subject = new Create()
  })

  describe("/create door The Big Door", function() {
    beforeEach(async function() {
      this.context.dungeon.doors.create.resolves(createADoor())
      this.response = stripAnsi(await this.subject.execute(this.context, "/create door The Big Door"))
    })

    it("creates the door", function() {
      expect(this.context.dungeon.doors.create).to.have.been.calledWithExactly("The Big Door", CURRENT_ROOM_ID)
    })

    it("returns the expected response", function() {
      expect(this.response).to.equal(`Door '${A_DOOR_NAME}' created with ID of ${A_DOOR_ID}.`)
    })
  })

  describe("/create door The Big Door to=23", function() {

    beforeEach(async function() {
      this.context.dungeon.doors.createTo.resolves(createADoor())
      this.response = stripAnsi(await this.subject.execute(this.context, "/create door The Big Door to=23"))
    })

    it("creates the door", function() {
      expect(this.context.dungeon.doors.createTo).to.have.been.calledWithExactly("The Big Door", CURRENT_ROOM_ID, DESTINATION_ROOM_ID)
    })

    it("returns the expected response", function() {
      expect(this.response).to.equal(`Door '${A_DOOR_NAME}' to room ${DESTINATION_ROOM_ID} created with ID of ${A_DOOR_ID}.`)
    })
  })

  describe("/create room The Blue Room", function() {
    beforeEach(async function() {
      this.context.dungeon.rooms.create.resolves(createARoom())
      this.response = stripAnsi(await this.subject.execute(this.context, "/create room The Blue Room"))
    })

    it("creates the room", function() {
      expect(this.context.dungeon.rooms.create).to.have.been.calledWith("The Blue Room")
    })

    it("returns the expected response", function() {
      expect(this.response).to.equal(`Room '${A_ROOM_NAME}' created with ID of ${A_ROOM_ID}.`)
    })
  })

  describe("/create unknown A Noun That Doesn't Exist", function() {
    beforeEach(async function() {
      this.response = stripAnsi(await this.subject.execute(this.context, "/create unknown A Noun That Doesn't Exist"))
    })

    it("return a reasonable error", function() {
      expect(this.response).to.equal("INVALID COMMAND: Ye can't get ye flask.")
    })
  })
})
