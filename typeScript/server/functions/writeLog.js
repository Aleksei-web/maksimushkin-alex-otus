const db = require('../db');

async function writeLog(id_company, str, status, message) {
  await db.query(`INSERT INTO log
	(id_company, router, status, ts, message)
	values($1, $2, $3, $4, $5)`, [id_company, str, status, new Date(), message]);
};

module.exports = writeLog;
