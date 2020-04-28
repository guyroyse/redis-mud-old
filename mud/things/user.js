class User {

    constructor(dungeon, {id}) {
      this.dungeon = dungeon
      this._id = id
    }
  
    id() {
      return this._id
    }
}
  
module.exports = User
  