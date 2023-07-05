const Pool = require('pg').Pool

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'sales-mng',
  password: 'karki',
  port: 5432,
})
module.exports = pool;