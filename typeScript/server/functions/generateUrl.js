const db = require('../db')
const crypto = require('crypto');

async function generateUrl(id_client, id_company, id_manager, id_deal) {

	let note = await db.query(
		`INSERT INTO quiz 
			(id_client, id_company, id_manager, id_deal, url) 
			values ($1, $2, $3, $4, $5) RETURNING id_client, id_deal, url`,
			[
				id_client, 
				id_company, 
				id_manager, 
				id_deal,
				crypto.randomBytes(4).toString('hex')
			]
		)
		return note.rows[0]
}

module.exports = generateUrl;