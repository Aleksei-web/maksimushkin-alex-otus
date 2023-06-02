const fs = require('fs')
const fsPromises = require('fs').promises
const {Worker} = require('worker_threads')

const runWorker = (data, fileName) => {
	return new Promise((resolve, reject) => {

		const worker = new Worker('./worker-sort-and-create-file.js', {workerData: {data, fileName}})
		worker.on('message', () => {
			resolve(`File - ${fileName} - created`)
		})

		worker.on('error', error => {
			reject(error)
		})
	})
}

const splitFile = async (countFiles, fileName) => {
	const fileStat = await fsPromises.stat(fileName)
	const sizeNewFile = Math.ceil(fileStat.size / countFiles)

	const stream = fs.createReadStream(fileName)

	let newData = ''
	let count = 1
	let bites = 0
	stream.on('data', async function (data) {
		bites += data.length
		newData += data

		if (bites / count >= sizeNewFile) {
			console.log('run worker')
			runWorker(newData, `./output/${count}`).then(data => console.log(data))
			count++
			newData = ''
		}
	})

	stream.on('end', () => {
		runWorker(newData, `./output/${count}`).then(data => console.log(data))
		console.log('generate file end')
	})

	stream.on('error', (err) => {
		console.log('error during generate file', err.name, err.message)
	})
}

module.exports = splitFile