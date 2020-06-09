const { Create } = require('../../../mud/text/commands/create')
const { Error } = require('../../../mud/text/commands')
const { Room, Door } = require('../../../mud/things/things')

describe("Create", function() {
  beforeEach(function() {
    sinon.stub(Room, 'create')
    sinon.stub(Door, 'create')
    sinon.stub(Error.prototype, 'execute')

    this.aRoom = createARoom()
    this.anotherRoom = createAnotherRoom()
    this.aThirdRoom = createAThirdRoom()

    this.aDoor = createADoor()

    this.currentRoom = createCurrentRoom()
    this.context = createStubContext(this.currentRoom)

    this.subject = new Create()
  })

  describe('/create door "The Big Door"', function() {
    beforeEach(async function() {
      Door.create.resolves(this.aDoor)
      this.response = stripAnsi(await this.subject.execute(this.context, '/create door "The Big Door"'))
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

  describe(`/create door "The Big Door" to=${A_ROOM_ID}`, function() {
    beforeEach(async function() {
      Door.create.resolves(this.aDoor)
      this.response = stripAnsi(await this.subject.execute(this.context, `/create door "The Big Door" to=${this.aRoom.id}`))
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

  describe(`/create door "The Big Door" to=${A_ROOM_ID} from=${ANOTHER_ROOM_ID}`, function() {
    beforeEach(async function() {
      Door.create.resolves(this.aDoor)
      this.response = stripAnsi(await this.subject.execute(this.context, `/create door "The Big Door" to=${this.aRoom.id} from=${this.anotherRoom.id}`))
    })

    it("creates the door", function() {
      expect(Door.create).to.have.been.calledWithExactly("The Big Door")
    })

    it("does not place the door in the current room", function() {
      expect(this.aDoor.placeIn).to.not.have.been.calledWithExactly(this.currentRoom.id)
    })

    it("places the door in the requested room", function() {
      expect(this.aDoor.placeIn).to.have.been.calledWithExactly(this.anotherRoom.id)
    })

    it("add the destination to the door", function() {
      expect(this.aDoor.addDestination).to.have.been.calledWithExactly(this.aRoom.id)
    })

    it("returns the expected response", function() {
      expect(this.response).to.equal(`Door '${this.aDoor.name}' created with ID of ${this.aDoor.id}.`)
    })
  })

  describe(`/create door "The Big Door" to=${A_ROOM_ID},${ANOTHER_ROOM_ID},${A_THIRD_ROOM_ID}`, function() {
    beforeEach(async function() {
      Door.create.resolves(this.aDoor)
      this.response = stripAnsi(await this.subject.execute(this.context, `/create door "The Big Door" to=${this.aRoom.id},${this.anotherRoom.id},${this.aThirdRoom.id}`))
    })

    it("creates the door", function() {
      expect(Door.create).to.have.been.calledWithExactly("The Big Door")
    })

    it("add the destinations to the door", function() {
      expect(this.aDoor.addDestination).to.have.been.calledWithExactly(this.aRoom.id)
      expect(this.aDoor.addDestination).to.have.been.calledWithExactly(this.anotherRoom.id)
      expect(this.aDoor.addDestination).to.have.been.calledWithExactly(this.aThirdRoom.id)
    })

    it("returns the expected response", function() {
      expect(this.response).to.equal(`Door '${this.aDoor.name}' created with ID of ${this.aDoor.id}.`)
    })
  })

  describe(`/create door "The Big Door" from=${A_ROOM_ID},${ANOTHER_ROOM_ID},${A_THIRD_ROOM_ID}`, function() {
    beforeEach(async function() {
      Door.create.resolves(this.aDoor)
      this.response = stripAnsi(await this.subject.execute(this.context, `/create door "The Big Door" from=${this.aRoom.id},${this.anotherRoom.id},${this.aThirdRoom.id}`))
    })

    it("creates the door", function() {
      expect(Door.create).to.have.been.calledWithExactly("The Big Door")
    })

    it("places the door in the requested rooms", function() {
      expect(this.aDoor.placeIn).to.have.been.calledWithExactly(this.aRoom.id)
      expect(this.aDoor.placeIn).to.have.been.calledWithExactly(this.anotherRoom.id)
      expect(this.aDoor.placeIn).to.have.been.calledWithExactly(this.aThirdRoom.id)
    })

    it("returns the expected response", function() {
      expect(this.response).to.equal(`Door '${this.aDoor.name}' created with ID of ${this.aDoor.id}.`)
    })
  })

  describe('/create room "The Blue Room"', function() {
    beforeEach(async function() {
      Room.create.resolves(this.aRoom)
      this.response = stripAnsi(await this.subject.execute(this.context, '/create room "The Blue Room"'))
    })

    it("creates the room", function() {
      expect(Room.create).to.have.been.calledWith("The Blue Room")
    })

    it("returns the expected response", function() {
      expect(this.response).to.equal(`Room '${this.aRoom.name}' created with ID of ${this.aRoom.id}.`)
    })
  })

  context("when parsing unknown noun", function() {
    beforeEach(async function() {
      this.response = stripAnsi(await this.subject.execute(this.context, "/create unknown A Noun That Doesn't Exist"))
    })

    it("delegates to the error command", function() {
      expect(Error.prototype.execute).to.have.been.calledWith(this.context, "/create unknown A Noun That Doesn't Exist")
    })
  })

  context("when parsing unknown noun with superfulous whitespace", function() {
    beforeEach(async function() {
      this.response = stripAnsi(await this.subject.execute(this.context, "/create  unknown  A Noun That Doesn't Exist"))
    })

    it("delegates to the error command", function() {
      expect(Error.prototype.execute).to.have.been.calledWith(this.context, "/create  unknown  A Noun That Doesn't Exist")
    })
  })

  context("when parsing a door command with superfulous whitespace", function() {
    beforeEach(async function() {
      Door.create.resolves(this.aDoor)
      this.response = stripAnsi(await this.subject.execute(this.context, `/create  door  "The Big Door"  to=${this.aRoom.id}  from=${this.anotherRoom.id}`))
    })

    it("creates the door", function() {
      expect(Door.create).to.have.been.calledWithExactly("The Big Door")
    })

    it("places the door in the requested room", function() {
      expect(this.aDoor.placeIn).to.have.been.calledWithExactly(this.anotherRoom.id)
    })

    it("add the destination to the door", function() {
      expect(this.aDoor.addDestination).to.have.been.calledWithExactly(this.aRoom.id)
    })

    it("returns the expected response", function() {
      expect(this.response).to.equal(`Door '${this.aDoor.name}' created with ID of ${this.aDoor.id}.`)
    })
  })

  context("when parsing a rooms command with superfulous whitespace", function() {
    beforeEach(async function() {
      Room.create.resolves(this.aRoom)
      this.response = stripAnsi(await this.subject.execute(this.context, '/create  room  "The Blue Room"'))
    })

    it("creates the room", function() {
      expect(Room.create).to.have.been.calledWith("The Blue Room")
    })

    it("returns the expected response", function() {
      expect(this.response).to.equal(`Room '${this.aRoom.name}' created with ID of ${this.aRoom.id}.`)
    })
  })

  context("when parsing a door command without quotes around the name", function() {
    beforeEach(async function() {
      Door.create.resolves(this.aDoor)
      this.response = stripAnsi(await this.subject.execute(this.context, `/create door The Big Door`))
    })

    it("creates the door with just the first word of the name", function() {
      expect(Door.create).to.have.been.calledWithExactly("The")
    })
  })

  context("when parsing a room command without quotes around the name", function() {
    beforeEach(async function() {
      Room.create.resolves(this.aRoom)
      this.response = stripAnsi(await this.subject.execute(this.context, '/create room The Blue Room'))
    })

    it("creates the room with just the first word of the name", function() {
      expect(Room.create).to.have.been.calledWith("The")
    })
  })

})
