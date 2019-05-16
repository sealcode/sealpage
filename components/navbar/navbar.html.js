const Component = require('../component.class');
// const formControls = require('./../../admin-panel/form-controls/form-controls.jsx');

const Navbar = new Component({
	renderFn: ({ title }) => {
		return /* HTML */ `
			<nav>${title}</nav>
		`;
	},
	propsControls: {
		// title: formControls.text,
		title: 'text',
	},
});

module.exports = Navbar;
