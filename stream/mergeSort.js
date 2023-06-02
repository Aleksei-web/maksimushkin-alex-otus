const mergeSort = (arr) => {
	if (arr.length <= 1) {
		return arr
	}

	const left = mergeSort(arr.slice(0, arr.length / 2))
	const right = mergeSort(arr.slice(arr.length / 2, arr.length))

	let i = 0
	let j = 0

	let sortedArray = []

	while (i < left.length && j < right.length) {
		if (left[i] === right[j]) {
			sortedArray = [...sortedArray, left[i], right[j]]
			j++
			i++
		} else if (left[i] < right[j]) {
			sortedArray = [...sortedArray, left[i]]
			i++
		} else {
			sortedArray = [...sortedArray, right[j]]
			j++
		}
	}
	if (i < left.length) {
		sortedArray.push(...left.slice(i, left.length))
	}
	if (j < right.length) {
		sortedArray.push(...right.slice(j, right.length))
	}

	return sortedArray
}

module.exports = mergeSort