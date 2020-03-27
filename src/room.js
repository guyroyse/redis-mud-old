class Room {

  constructor({uuid, name, desc}) {
    this.uuid = uuid
    this.name = name
    this.desc = desc
  }

  uuid() { return this.uuid }
  name() { return this.name }
  desc() { return this.desc }

}

module.exports = Room
