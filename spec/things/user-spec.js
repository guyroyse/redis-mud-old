const RedisGraphShim = require('../../mud/data/redis-graph-shim')
const UserQueries = require('../../mud/things/user-queries')
const { User } = require('../../mud/things/things')

describe("User", function() {

  describe("#byId", function() {

    context("when found", function() {
      beforeEach(async function() {
        RedisGraphShim.prototype.executeAndReturnSingle
          .resolves([ A_USER_ID, A_USER_PASSWORD ])
        this.result = await User.byId(A_USER_ID)
      })
  
      it("askes the graph for the user", function() {
        expect(RedisGraphShim.prototype.executeAndReturnSingle)
          .to.have.been.calledWith(UserQueries.FETCH_BY_ID, { id: A_USER_ID })
      })
  
      it("returns a user with expected properties", function() {
        expect(this.result.id).to.equal(A_USER_ID)
        expect(this.result.password).to.equal(A_USER_PASSWORD)
      })  
    })

    context("when not found", function() {
      beforeEach(async function() {
        RedisGraphShim.prototype.executeAndReturnSingle.resolves(null)
        this.result = await User.byId(A_USER_ID)
      })
  
      it("askes the graph for the user", function() {
        expect(RedisGraphShim.prototype.executeAndReturnSingle)
          .to.have.been.calledWith(UserQueries.FETCH_BY_ID, { id: A_USER_ID })
      })
  
      it("returns null", function() {
        expect(this.result).to.be.null
      })  
    })
  })

  describe("#create", function() {
    beforeEach(async function() {
      RedisGraphShim.prototype.executeAndReturnSingle
        .resolves([ A_USER_ID, A_USER_PASSWORD ])
      this.result = await User.create(A_USER_ID, A_USER_PASSWORD)
    })

    it("creates the user", function() {
      expect(RedisGraphShim.prototype.executeAndReturnSingle)
        .to.have.been.calledWith(UserQueries.CREATE, { 
          id: A_USER_ID,
          password: A_USER_PASSWORD })
    })

    it("returns a user with expected properties", function() {
      expect(this.result.id).to.equal(A_USER_ID)
      expect(this.result.password).to.equal(A_USER_PASSWORD)
    })
  })

  context("when created", function() {
    beforeEach(function() {
      this.subject = new User({
        id: A_USER_ID,
        password: A_USER_PASSWORD })
    })
  
    it("has expected id", function() {
      expect(this.subject.id).to.equal(A_USER_ID)
    })
  
    it("has expected password", function() {
      expect(this.subject.password).to.equal(A_USER_PASSWORD)
    })
  
    context("when renamed", function() {
      beforeEach(function() {
        this.subject.password = ANOTHER_USER_PASSWORD
      })
  
      it("has the new password", function() {
        expect(this.subject.password).to.equal(ANOTHER_USER_PASSWORD)
      })
  
      it("updates the graph", function() {
        expect(RedisGraphShim.prototype.execute)
          .to.have.been.calledWith(UserQueries.UPDATE, {
            id: A_USER_ID,
            password: ANOTHER_USER_PASSWORD
          })
      })
    })
  })
})
