class Room {

  constructor(dungeon, {id, name, description}) {
    this.dungeon = dungeon
    this._id = id
    this._name = name
    this._description = description
  }

  id() {
    return this._id
  }

  name(name) {
    if (name) {
      this._name = name
      this.dungeon.updateRoom(this.id(), this.name(), this.description())
    }

    return this._name
  }

  description(description) {
    if (description) {
      this._description = description
      this.dungeon.updateRoom(this.id(), this.name(), this.description())
    }

    return this._description
  }
  
  static fromValues(values) {
    if(values!=null) {
      return new Room(this, {
        id: values[0],
        name: values[1],
        description: values[2]
      })
    }
    return null;
  }

}

module.exports = Room
