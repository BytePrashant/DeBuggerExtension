const Pool = require('pg').Pool

const pool = new Pool({
    user: "postgres",
    password: "Pra@7651",
    host: "localhost",
    port: 5432,
    database: "Todo"
})

module.exports = pool;