const splitFile = require('./splitFile')
const sortAllFiles = require('./sortAllFiles')


const main = async () => {
	// await splitFile(10, './bigFile')
	await sortAllFiles()
}

main()