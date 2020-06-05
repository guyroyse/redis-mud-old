const { List } = require('../../../mud/text/commands')
const Rooms = require('../../../mud/things/rooms/rooms')

describe("List", function() {
  beforeEach(function() {
    sinon.stub(Rooms, 'all')

    this.context = createStubContext()
    this.subject = new List()
  })

  describe("/list", function() {
    beforeEach(async function() {
      this.aRoom = createARoom()
      this.anotherRoom = createAnotherRoom()
      this.aThirdRoom = createAThirdRoom()
      Rooms.all.resolves([this.aRoom, this.anotherRoom, this.aThirdRoom])

      this.response = await this.subject.execute(this.context, "/list")
    })

    it("returns the expected response", function() {
      let expected =
        `[${this.aRoom.name}] ${this.aRoom.id}\n` +
        `[${this.anotherRoom.name}] ${this.anotherRoom.id}\n` +
        `[${this.aThirdRoom.name}] ${this.aThirdRoom.id}`
      expect(this.response).to.equal(expected)
    })
  })
})
