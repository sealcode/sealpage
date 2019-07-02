const Component = require('../component.class');

class Navbar extends Component {
	renderFn(s, { title }) {
		return /* HTML */ `
			<nav>${title}</nav>
		`;
	}
	static propsControls() {
		return {
			title: { label: 'Title', control: 'text' },
		};
	}
}

module.exports = Navbar;
