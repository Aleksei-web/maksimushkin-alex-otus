const fs = require('fs').promises

const dir = process.argv[2]

if (!dir) {
	console.log('Нужно указать путь к директории!');
	return
}

const read = async (path) => {
	const files = await fs.readdir(path, {withFileTypes: true})
	const dirs = files.filter(el => el.isDirectory())
	let result = {
		files: files.filter(f => !f.isDirectory()).map(el => `${path}/${el.name}`),
		dirs: [path]
	}

	if (dirs.length) {
		const filesFromDirs = await Promise.all(dirs.map(el => read(`${path}/${el.name}`)))

		filesFromDirs.forEach(current => {
			result.files = [...result.files, ...current.files]
			result.dirs = [...result.dirs, ...current.dirs]
		})
	}

	return result
}

read(dir).then(data => console.log(data)).catch(e => console.log(e.message))