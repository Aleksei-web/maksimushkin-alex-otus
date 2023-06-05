const db = require('../db')


async function getDataByIdAndDate(id_company, limit, page, startDate, endDate) {
	console.log('id', id_company);
	const data = await db.query(`SELECT id, id_client, rating, comment, id_manager, id_deal, ts FROM quiz
	WHERE id_company = $1
	AND
	ts IS NOT NULL
	AND ts BETWEEN $2 AND $3 
	ORDER BY ts DESC
	LIMIT ${limit} OFFSET ${(page - 1) * limit}
	`, [id_company, startDate, endDate]
	)
	return data;
}

module.exports = getDataByIdAndDate;
