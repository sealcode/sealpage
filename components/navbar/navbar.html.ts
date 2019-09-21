import Component from '../component.class';

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

export default Navbar;
