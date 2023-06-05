const Pool = require("pg").Pool;

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  port: 5432,
  password: "Aa31337",
  database: "nps",
});

module.exports = pool;