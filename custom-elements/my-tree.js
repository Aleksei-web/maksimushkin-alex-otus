class MyTree extends HTMLElement {

	constructor() {
		super();
		this.shadow = this.attachShadow({mode: 'open'});
	}


	render() {
		let data = this.getAttribute('data');
		data = JSON.parse(data);

		const name = document.createElement('h2');
		name.innerText = `id: ${data.id}`
		this.shadow.appendChild(name)


		data.items.forEach(el => {
			const child = el.items ? new MyTree() : new MyLeaf()
			child.setAttribute('data', JSON.stringify(el));
			this.shadow.appendChild(child)
		});
	}

	connectedCallback() {
		const style = document.createElement('style');
		const styles = `my-tree, my-leaf {
        margin-left: 20px;
        display: block;
      }`;

		style.innerHTML = styles;
		this.shadow.appendChild(style)
	}

	//
	static get observedAttributes() {
		return ['data'];
	}


	attributeChangedCallback() {
		this.render();
	}
}

customElements.define('my-tree', MyTree);