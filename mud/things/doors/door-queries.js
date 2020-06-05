module.exports = {
  IN_ROOM: `
    MATCH (from:room)-[:contains]->(d:door)
    WHERE id(from) = $roomId
    RETURN id(d) as id, d.name as name, d.description as description`,

  CREATE: `
    CREATE (d:door { name: $name, description: $description })
    RETURN id(d) as id, d.name as name, d.description as description`,

  PLACE_IN: `
    MATCH (d:door) WHERE id(d) = $id
    MATCH (r:room) WHERE id(r) = $roomId
    CREATE (r)-[:contains]->(d)`,

  ADD_DESTINATION: `
    MATCH (d:door) WHERE id(d) = $id
    MATCH (r:room) WHERE id(r) = $roomId
    CREATE (d)-[:leads_to]->(r)`,

  UPDATE: `
    MATCH (d:door)
    WHERE id(d) = $id
    MERGE (d)
    ON MATCH SET
      d.name = $name,
      d.description = $description`
}
