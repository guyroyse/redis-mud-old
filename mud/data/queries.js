module.exports = {

  FETCH_ALL_USERS: `
    MATCH
      (u:user)-[o:occupies]->(r:room)
    RETURN
      id(u), u.name, id(r), r.name`,

  FETCH_USER: `
    MATCH
      (u:user)
    WHERE
      id(u) = $id
    RETURN id(u), u.name`,

  CREATE_USER: `
    CREATE (u:user {name: $name})
    RETURN id(u), u.name`,

  DELETE_USER: `
    MATCH (u:user) WHERE id(u) = $id
    DELETE u`,

  DELETE_ROOM: `
    MATCH (r:room) WHERE id(r) = $id
    DELETE r`,

  FETCH_ROOM: `
    MATCH
     (r:room)
    WHERE
      id(r) = $id
    RETURN id(r), r.name, r.description`,

  FETCH_OR_CREATE_HUB: `
    MERGE (r:room { hub: 'true' })
    ON CREATE SET r.name = $name, r.description = $description, r.hub = 'true'
    RETURN id(r), r.name, r.description`,

  FETCH_ALL_ROOMS: `
    MATCH (r:room)
    RETURN id(r), r.name, r.description`,

  
  CREATE_ROOM: `
    CREATE
      (r:room { name: $name, description: $description })
    RETURN id(r), r.name, r.description`,

  CREATE_PORTAL: `
    CREATE
      (r:portal { name: $name, description: $description })
    RETURN id(r), r.name, r.description`,

  OCCUPY: `
    MATCH (occupant:user) WHERE id(occupant) = $idOccupant
    MATCH (residence:room) WHERE id(residence) = $idResidence
    CREATE (occupant)-[o:occupies]->(residence)
    RETURN id(o)`,

  VACATE: `
    MATCH (occupant:user)-[o:occupies]->() WHERE id(occupant) = $idOccupant
    DELETE o`,

  FETCH_OCCUPANT_ROOM:`
    MATCH (occupant:user)-[o:occupies]->(r:room) WHERE id(occupant) = $idOccupant
    RETURN id(r), r.name, r.description`,
  
  CREATE_DOOR: `
    MATCH (from:room) WHERE id(from) = $idFrom
    MATCH (to:room) WHERE id(to) = $idTo
    CREATE (from)-[d:door {name: $name, description: $description}]->(to)
    RETURN id(d), d.name, d.description, id(from), id(to)`,

  UPDATE_ROOM: `
    MATCH (r:room)
    WHERE id(r) = $id
    MERGE (r)
    ON MATCH SET r.name = $name, r.description = $description`,

  UPDATE_USER: `
    MATCH (u:user)
    WHERE id(u) = $id
    MERGE (u)
    ON MATCH SET u.name = $name`,

}