const promiseReduce = async (asyncFunctions, reducer, initialValue) => {
	let result = initialValue
	try {
		for (const fn of asyncFunctions) {
			const val = await fn()
			result = reducer(result, val)
		}

		return result
	} catch (e) {
		console.log(`Failed: reason = ${e.message}`)
	}
}

const fn1 = () => {
	console.log('fn1')
	return Promise.resolve(1)
}
const fn2 = () => new Promise(resolve => {
	console.log('fn2')
	setTimeout(() => resolve(2), 1000)
})

promiseReduce(
	[fn1, fn2],
	function (memo, value) {
		console.log('reduce')
		return memo * value
	},
	1
)
	.then(console.log)