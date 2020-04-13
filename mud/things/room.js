class Room {

  constructor(dungeon, {uuid, name, desc}) {
    this.dungeon = dungeon
    this._uuid = uuid
    this._name = name
    this._desc = desc
  }

  uuid() {
    return this._uuid
  }

  name() {
    return this._name
  }

  desc(description) {
    if (description) {
      this._desc = description
      this.dungeon.updateRoom(this.uuid(), this.name(), this.desc())
    }

    return this._desc
  }

}

module.exports = Room
