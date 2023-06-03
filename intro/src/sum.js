const sum = (a) => {
	let result = a

	function fn(b) {
		if (b === undefined) {
			return result
		}
		result = result + b

		return fn
	}

	return fn
}

module.exports = sum