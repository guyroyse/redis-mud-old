class Room {

  constructor({uuid, name, desc}) {
    this._uuid = uuid
    this._name = name
    this._desc = desc
  }

  uuid() { return this._uuid }
  name() { return this._name }
  desc() { return this._desc }

}

module.exports = Room
