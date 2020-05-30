module.exports = {
  IN_ROOM: `
    MATCH (r:room)-[:contains]->(d:door)
    WHERE id(r) = $roomId
    RETURN id(d), d.name, d.description`,

  CREATE: `
    MATCH (r:room)
    WHERE id(r) = $containingRoom
    CREATE (r)-[:contains]->(d:door {name: $name, description: $description})
    RETURN id(d), d.name, d.description`,

  UPDATE: `
    MATCH (d:door)
    WHERE id(d) = $id
    MERGE (d)
    ON MATCH SET
      d.name = $name,
      d.description = $description`
}
