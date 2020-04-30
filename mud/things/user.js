class User {

    constructor(dungeon, {id, name}) {
      this.dungeon = dungeon
      this._id = id
      this._name = name
    }
  
    id() {
      return this._id
    }

    name(name) {
      if(name){
        this._name = name
        this.dungeon.updateUser(this.id(), this.name())
      }
      return this._name
    }

    static fromValues(dungeon, values) {
      if(values!=null){
        return new User(dungeon, {
          id: values[0],
          name: values[1]
        })
      } else {
        return null
      }
    }
  
}
  
module.exports = User
  