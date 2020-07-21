module.exports = {
  FETCH_BY_ID: `
    MATCH (u:user)
    WHERE u.id = $id
    RETURN u.id, u.password`,
  CREATE: `
    CREATE (u:user { id: $id, password: $password })
    RETURN u.id, u.password`,
  UPDATE: `
    MATCH (u:user)
    WHERE u.id = $id
    MERGE (u)
    ON MATCH SET
      u.password = $password`
}