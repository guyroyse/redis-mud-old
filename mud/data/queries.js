module.exports = {

  FETCH_ROOM: `
    MATCH
     (r:room)
    WHERE
      id(r) = $id
    RETURN id(r), r.name, r.description`,

  FETCH_OR_CREATE_HUB: `
    MERGE
      (r:room { hub: 'true' })
    ON CREATE SET
      r.name = $name,
      r.description = $description,
      r.hub = 'true'
    RETURN
      id(r), r.name, r.description`,

  FETCH_ALL_ROOMS: `
    MATCH
      (r:room)
    RETURN
      id(r), r.name, r.description`,

  CREATE_ROOM: `
    CREATE
      (r:room { name: $name, description: $description })
    RETURN
      id(r), r.name, r.description`,

  CREATE_PORTAL: `
    CREATE
      (r:portal { name: $name, description: $description })
    RETURN
      id(r), r.name, r.description`,
  
  CREATE_DOOR: `
    MATCH (from:room) WHERE id(from) = $idFrom
    MATCH (to:room) WHERE id(to) = $idTo
    CREATE
      (from)-[d:door {name: $name, description: $description}]->(to)
    RETURN
      id(d), d.name, d.description, id(from), id(to)`,

  UPDATE_ROOM: `
      MATCH
        (r:room)
      WHERE
        id(r) = $id
      MERGE
        (r)
      ON MATCH SET
        r.name = $name,
        r.description = $description`,

}