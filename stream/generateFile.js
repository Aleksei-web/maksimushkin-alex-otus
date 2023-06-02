const fs = require('fs')
const fsPromises = require('fs').promises

const randomNumber = () => {
	return Math.floor(Math.random() * 1000).toString()
}
const generateFile = async (sizeMb) => {
	let isReadyFile = false
	const stream = fs.createWriteStream('./bigFile', {flags: 'a'});

	while (!isReadyFile) {
		stream.write(randomNumber() + ' ')
		stream.writableLength >= 1000 * 1000 * sizeMb ? isReadyFile = true : isReadyFile = false
	}

	await stream.close()
	return 'ok'
}

generateFile(10)