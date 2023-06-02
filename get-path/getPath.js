const CONSTANTS = require('./constants')

const getPath = (element, parent) => {
	const originalElement = element
	if (!(element instanceof Element)) {
		throw new Error(CONSTANTS.ERRORS.INCORRECT_ELEMENT)
	}

	const selectors = [];
	const id = element.getAttribute('id')
	if (id) {
		return `#${id}`
	}

	while (element) {
		let selector = element.tagName.toLowerCase();

		if (element.id) {
			selector += `#${element.id}`;
			selectors.unshift(selector);
			break;
		} else {
			const classes = getClasses(element)
			if (classes) {
				selector += `.${classes.join('.')}`
			}
			selectors.unshift(selector);
		}

		element = element.parentElement;
	}

	let result = selectors.join(' ');

	if (parent.querySelectorAll(result).length > 1) {
		parent.querySelectorAll(result).forEach((el, idx) => {
			if (el === originalElement) {
				result += `:nth-child(${idx + 1})`
			}
		})
	}

	return result
}

const getClasses = (el) => {
	const classes = el.classList
	if (!classes.length) {
		return null
	}

	return Array.from(classes)
}

module.exports = getPath;