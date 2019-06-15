const Component = require('./component.class');

class Plugin extends Component {
	constructor({ renderFn, propsControls, name }) {
		super({ renderFn, propsControls });
		this.name = name;
		if (!name)
			throw new Error(
				'Name must be provided for the user defined Plugin'
			);
	}
}

module.exports = Plugin;
