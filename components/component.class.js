module.exports = class Component {
	constructor({ renderFn, propsControls }) {
		if (typeof renderFn !== 'function') {
			throw new Error('renderFn must be a function');
		}

		if (typeof propsControls !== 'object') {
			throw new Error('propsControls must be an object');
		}

		for (let item in propsControls) {
			console.log(item, propsControls);
			if (typeof propsControls[item] !== 'string') {
				throw new Error(
					`${propsControls[item]} formControl is not a string`
				);
			}
		}

		this.renderFn = renderFn;
		this.propsControls = propsControls;
	}

	async render(propsControls) {
		return await this.renderFn(propsControls);
	}
};
