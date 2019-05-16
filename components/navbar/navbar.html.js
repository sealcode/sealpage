const Component = require('../component.class');

const Navbar = new Component({
	renderFn: ({ title }) => {
		return /* HTML */ `
			<nav>${title}</nav>
		`;
	},
	propsControls: {
		title: 'text',
	},
});

module.exports = Navbar;
