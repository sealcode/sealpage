module.exports = class Component {
	constructor(s) {
		this.s = s;
	}

	async render(props) {
		return await this.renderFn(this.s, props);
	}
};
