const getPath = require('./getPath')
const CONSTANTS = require('./constants')

describe('getPath', () => {
	it('should return error if element incorrect', () => {
		const element = 'div'
		const parent = document.createElement('div')
		try {
			getPath(element, parent)
		} catch (e) {
			expect(e.message).toBe(CONSTANTS.ERRORS.INCORRECT_ELEMENT)
		}
	})

	it('should return id if element has it', () => {
		const parent = document.createElement('div')
		const element = document.createElement('div');
		element.id = 'id';
		parent.appendChild(element)

		const selector = getPath(element, parent);
		expect(selector).toEqual('#id');
	});

	it('should return a unique CSS selector for an element with classes', () => {
		const parent = document.createElement('div')
		const element = document.createElement('div');
		element.classList.add('class1', 'class2', 'class3');

		parent.appendChild(element)

		const selector = getPath(element, parent);
		expect(selector).toEqual('div div.class1.class2.class3');
	});

	it('should return a unique CSS selector for an element without ID and classes', () => {
		const element = document.createElement('div');
		element.innerHTML = `
		<div>
			<div>
				<span></span>
			</div>
	  </div>
		`

		const span = element.querySelector('span')
		const selector = getPath(span, element);
		expect(selector).toEqual('div div div span');
	});

	it('should return a unique CSS selector for an multiple the same element', () => {
		const element = document.createElement('div');
		const html = `
		<div>
			<div>
				<span></span>
				<span></span>
			</div>	
	  </div>
		`
		element.innerHTML = html
		const span = element.querySelector('span:nth-child(2)')


		const selector = getPath(span, element);
		expect(selector).toEqual('div div div span:nth-child(2)');
	});
});