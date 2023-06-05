const checkLicense = require("../functions/checkLincense");
const writeLog = require("../functions/writeLog");

const isLicenseValid = async (req, res, next) => {
	const {INN, RegDate, id_company} = req.body;
	const license = await checkLicense(INN, RegDate);
	if(!license) {
		await writeLog(id_company, 'получить данные', 400, `инн ${INN} или дата регистрации ${RegDate} не верные`)
		return res.sendStatus(400)
	} else {
		next()
	}
}

module.exports = isLicenseValid;
