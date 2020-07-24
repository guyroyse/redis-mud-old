module.exports = {
  FETCH_BY_NAME: `
    MATCH (u:user)
    WHERE u.name = $name
    RETURN u.id, u.name, u.password`,
  CREATE: `
    CREATE (u:user { name: $name, password: $password })
    RETURN u.id, u.name, u.password`,
  UPDATE: `
    MATCH (u:user)
    WHERE u.name = $name
    MERGE (u)
    ON MATCH SET
      u.password = $password`
}