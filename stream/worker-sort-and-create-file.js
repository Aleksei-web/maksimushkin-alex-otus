const {parentPort, workerData} = require("worker_threads");
const {promises: fsPromises} = require("fs");

const mergeSort = require("./mergeSort");

const sortAndSaveToFile = (data, filename) => {
	console.time(filename)
	const array = data.toString().split(' ').map(el => +el)
	const sortedDataArr = mergeSort(array)
	console.timeEnd(filename)
	fsPromises.writeFile(filename, sortedDataArr.join(' ')).then(_ => console.log('file created'))

	return 'ok'
}

parentPort.postMessage(sortAndSaveToFile(workerData.data, workerData.fileName))
