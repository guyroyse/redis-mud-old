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

  describe("Door", function() {
    beforeEach(async function() {
      Door.create.resolves(this.aDoor)
    })

    context('when creating a door', function() {
      beforeEach(async function() {
        this.response = stripAnsi(await this.subject.execute(this.context, '/create door "The Big Door"'))
      })
  
      it("creates the door", function() {
        expect(Door.create).to.have.been.calledWithExactly("The Big Door")
      })
  
      it("places the door in the current room", function() {
        expect(this.aDoor.placeIn).to.have.been.calledWithExactly(this.currentRoom.id)
      })
  
      it("does not add a destination", function() {
        expect(this.aDoor.addDestination).not.to.have.been.called
      })
  
      it("returns the expected response", function() {
        expect(this.response).to.equal(`Door '${this.aDoor.name}' created with ID of ${this.aDoor.id}.`)
      })
    })

    context('when creating a door to rooms', function() {
      beforeEach(async function() {
        this.response = stripAnsi(await this.subject.execute(this.context, `/create door "The Big Door" to=${this.aRoom.id},${this.anotherRoom.id},${this.aThirdRoom.id}`))
      })
  
      it("creates the door", function() {
        expect(Door.create).to.have.been.calledWithExactly("The Big Door")
      })
  
      it("places the door in the current room", function() {
        expect(this.aDoor.placeIn).to.have.been.calledWithExactly(this.currentRoom.id)
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
  
    context('when creating a door from rooms', function() {
      beforeEach(async function() {
        this.response = stripAnsi(await this.subject.execute(this.context, `/create door "The Big Door" from=${this.aRoom.id},${this.anotherRoom.id},${this.aThirdRoom.id}`))
      })
  
      it("creates the door", function() {
        expect(Door.create).to.have.been.calledWithExactly("The Big Door")
      })
  
      it("places the door in the requested room", function() {
        expect(this.aDoor.placeIn).to.have.been.calledWithExactly(this.aRoom.id)
        expect(this.aDoor.placeIn).to.have.been.calledWithExactly(this.anotherRoom.id)
        expect(this.aDoor.placeIn).to.have.been.calledWithExactly(this.aThirdRoom.id)
      })
  
      it("does not add a destination", function() {
        expect(this.aDoor.addDestination).not.to.have.been.called
      })
  
      it("returns the expected response", function() {
        expect(this.response).to.equal(`Door '${this.aDoor.name}' created with ID of ${this.aDoor.id}.`)
      })
    })

    context('when creating a door to multiple rooms', function() {
      beforeEach(async function() {
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
  
    context('when creating a door to and from a room', function() {
      beforeEach(async function() {
        this.response = stripAnsi(await this.subject.execute(this.context, `/create door "The Big Door" to=${this.aRoom.id} from=${this.anotherRoom.id}`))
      })
  
      it("creates the door", function() {
        expect(Door.create).to.have.been.calledWithExactly("The Big Door")
      })
  
      it("places the door in the requested rooms", function() {
        expect(this.aDoor.placeIn).to.have.been.calledWithExactly(this.anotherRoom.id)
      })

      it("add the destinations to the door", function() {
        expect(this.aDoor.addDestination).to.have.been.calledWithExactly(this.aRoom.id)
      })

      it("returns the expected response", function() {
        expect(this.response).to.equal(`Door '${this.aDoor.name}' created with ID of ${this.aDoor.id}.`)
      })
    })
  })

  describe("Room", function() {
    beforeEach(async function() {
      Room.create.resolves(this.aRoom)
    })

    context('when creating a room', function() {
      beforeEach(async function() {
        this.response = stripAnsi(await this.subject.execute(this.context, '/create room "The Blue Room"'))
      })
  
      it("creates the room", function() {
        expect(Room.create).to.have.been.calledWith("The Blue Room")
      })
  
      it("returns the expected response", function() {
        expect(this.response).to.equal(`Room '${this.aRoom.name}' created with ID of ${this.aRoom.id}.`)
      })
    })
  })

  describe("Unknown", function() {
    context("when parsing unknown subcommand", function() {
      beforeEach(async function() {
        this.response = stripAnsi(await this.subject.execute(this.context, `/create unknown "A Noun That Doesn't Exist"`))
      })

      it("delegates to the error command", function() {
        expect(Error.prototype.execute).to.have.been.calledWith(this.context, `/create unknown "A Noun That Doesn't Exist"`)
      })
    })
  })
})
