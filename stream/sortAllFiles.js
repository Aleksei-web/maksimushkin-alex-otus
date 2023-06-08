const fsPromises = require('fs').promises
const fs = require('fs');

const sortAllFiles = async () => {
	const map = {}
	const files = await fsPromises.readdir('./output')
	const mapStreams = []
	for (const file of files){
		map[file] = {idx: 0}
		mapStreams.push({stream: (fs.createReadStream('./output/' + file)), file})
	}

	for(let data of mapStreams){
		await new Promise((resolve, reject) => {
			data.stream.on('data', (chunk) => {
				console.log('data ', data.file)
				map[data.file].arr = chunk.toString().split(' ')
				map[data.file].idx = 0
				data.stream.pause()
				resolve(true)
			})

			data.stream.on('end', () => {
				map[data.file].end = true
			})

			data.stream.on('err', (err) => {
				reject(err)
			})
		})
	}

	await fsPromises.writeFile('./resultFile', '')
	while (Object.keys(map).length){
		const min = getMinVal(map)
		let writeString = ''
		Object.entries(map).forEach(([file,{arr, idx, end}]) => {
			if(arr[idx] <= min && arr.length > idx){
				writeString += min + ' '
				map[file].idx = map[file].idx + 1
			}if(arr.length <= idx){
				if(end){
					delete map[file]
				}else {
				const currentStream = mapStreams.find(el => el.file == file)
					if(currentStream){
						currentStream.stream.resume()
					}
				}
			}
		})

		await fsPromises.appendFile('./resultFile', writeString)
	}

}

const getMinVal = (map) => {
	let min = Number.MAX_SAFE_INTEGER ;
	Object.values(map).forEach(({arr, idx}) => min = Math.min(min, arr[idx]))

	return min;
}

module.exports = sortAllFiles
