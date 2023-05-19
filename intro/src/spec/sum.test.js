const sum = require('../sum')

test('Sum should return sum of two values', () => {
	expect(sum(1)(2)()).toBe(3)
})

test('Sum should return sum of three values', () => {
	expect(sum(1)(2)(3)()).toBe(6)
})

test('Sum should return sum of ten values', () => {
	expect(sum(1)(2)(3)(4)(5)(6)(7)(8)(9)(0)()).toBe(45)
})

test('Sum should correct calculate negative numbers', () => {
	expect(sum(1)(-2)()).toBe(-1)
})