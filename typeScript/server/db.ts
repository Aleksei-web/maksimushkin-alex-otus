// const Pool = require("pg").Pool;
import {Pool} from 'pg'

export const db = new Pool({
  user: "postgres",
  host: "localhost",
  port: 5432,
  password: "Aa31337",
  database: "nps",
});
