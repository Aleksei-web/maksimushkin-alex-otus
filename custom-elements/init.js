window.addEventListener('DOMContentLoaded', () => {
	const data = {
		id: 1, items: [{
			id: 2, items: [{
				id: 3
			}]
		}]
	};

	document.querySelector('#my-tree').setAttribute('data', JSON.stringify(data));
})