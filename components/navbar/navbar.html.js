const Component = require('../component.class');

class Navbar extends Component {
	renderFn(s, { title }) {
		return /* HTML */ `
			<nav>${title}</nav>
		`;
	}
	static propsControls() {
		return { title: 'text' };
	}
}

module.exports = Navbar;
