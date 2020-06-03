module.exports = {
  IN_ROOM: `
    MATCH (from:room)-[:contains]->(d:door)
    WHERE id(from) = $roomId
    RETURN id(d), d.name, d.description`,

  CREATE: `
    MATCH (r:room)
    WHERE id(r) = $containingRoom
    CREATE (r)-[:contains]->(d:door {name: $name, description: $description})
    RETURN id(d), d.name, d.description`,

  CREATE_TO: `
    MATCH (from:room) WHERE id(from) = $containingRoom
    MATCH (to:room) WHERE id(to) = $destinationRoom
    CREATE (from)-[:contains]->(d:door {name: $name, description: $description})-[:leads_to]->(to)
    RETURN id(d), d.name, d.description`,

  UPDATE: `
    MATCH (d:door)
    WHERE id(d) = $id
    MERGE (d)
    ON MATCH SET
      d.name = $name,
      d.description = $description`
}
