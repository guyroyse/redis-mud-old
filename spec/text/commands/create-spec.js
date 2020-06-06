const { Create } = require('../../../mud/text/commands')
const { Room, Door } = require('../../../mud/things/things')

describe("Create", function() {
  beforeEach(function() {
    sinon.stub(Room, 'create')
    sinon.stub(Door, 'create')

    this.aRoom = createARoom()
    this.aDoor = createADoor()

    this.currentRoom = createCurrentRoom()
    this.context = createStubContext(this.currentRoom)

    this.subject = new Create()
  })

  describe("/create door The Big Door", function() {
    beforeEach(async function() {
      Door.create.resolves(this.aDoor)
      this.response = stripAnsi(await this.subject.execute(this.context, "/create door The Big Door"))
    })

    it("creates the door", function() {
      expect(Door.create).to.have.been.calledWithExactly("The Big Door")
    })

    it("places the door in the current room", function() {
      expect(this.aDoor.placeIn).to.have.been.calledWithExactly(this.currentRoom.id)
    })

    it("returns the expected response", function() {
      expect(this.response).to.equal(`Door '${this.aDoor.name}' created with ID of ${this.aDoor.id}.`)
    })
  })

  describe(`/create door The Big Door to=${A_ROOM_ID}`, function() {
    beforeEach(async function() {
      Door.create.resolves(this.aDoor)
      this.response = stripAnsi(await this.subject.execute(this.context, `/create door The Big Door to=${this.aRoom.id}`))
    })

    it("creates the door", function() {
      expect(Door.create).to.have.been.calledWithExactly("The Big Door")
    })

    it("places the door in the current room", function() {
      expect(this.aDoor.placeIn).to.have.been.calledWithExactly(this.currentRoom.id)
    })

    it("add the destination to the door", function() {
      expect(this.aDoor.addDestination).to.have.been.calledWithExactly(this.aRoom.id)
    })

    it("returns the expected response", function() {
      expect(this.response).to.equal(`Door '${this.aDoor.name}' created with ID of ${this.aDoor.id}.`)
    })
  })

  describe("/create room The Blue Room", function() {
    beforeEach(async function() {
      Room.create.resolves(this.aRoom)
      this.response = stripAnsi(await this.subject.execute(this.context, "/create room The Blue Room"))
    })

    it("creates the room", function() {
      expect(Room.create).to.have.been.calledWith("The Blue Room")
    })

    it("returns the expected response", function() {
      expect(this.response).to.equal(`Room '${this.aRoom.name}' created with ID of ${this.aRoom.id}.`)
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
