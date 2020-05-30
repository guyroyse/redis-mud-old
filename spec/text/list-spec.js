const { List } = require('../../mud/text/commands')

describe("List", function() {
  beforeEach(function() {
    this.dungeon = createStubDungeon()
    this.context = createStubContext(this.dungeon, null)

    this.subject = new List()
  })

  describe("/list", function() {
    beforeEach(async function() {
      this.dungeon.rooms.all.resolves([createARoom(), createAnotherRoom(), createAThirdRoom()])

      this.response = await this.subject.execute(this.context, "/list")
    })

    it("returns the expected response", function() {
      let expected =
        `[${A_ROOM_NAME}] ${A_ROOM_ID}\n` +
        `[${ANOTHER_ROOM_NAME}] ${ANOTHER_ROOM_ID}\n` +
        `[${A_THIRD_ROOM_NAME}] ${A_THIRD_ROOM_ID}`
      expect(this.response).to.equal(expected)
    })
  })
})
