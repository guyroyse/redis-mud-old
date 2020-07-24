module.exports = {
  FETCH_BY_NAME: `
    MATCH (u:user)
    WHERE u.name = $name
    RETURN u.id as id, u.name as name, u.password as password`,

  CREATE: `
    CREATE (u:user { name: $name, password: $password })
    RETURN u.id as id, u.name as name, u.password as password`,

  UPDATE: `
    MATCH (u:user)
    WHERE u.name = $name
    MERGE (u)
    ON MATCH SET
      u.password = $password`
}