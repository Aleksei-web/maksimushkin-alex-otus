import {db} from "../db";

export const writeLog = async (id_company: string | null, str: string, status: number, message?: string) => {
  await db.query(`INSERT INTO log
	(id_company, router, status, ts, message)
	values($1, $2, $3, $4, $5)`, [id_company, str, status, new Date(), message]);
};

