import Component from '../component.class';
import formControls from '../../admin-panel/form-controls/form-controls';

const Navbar = new Component({
	renderFn: ({ title }) => {
		return /* HTML */ `
			<nav>${title}</nav>
		`;
	},
	propsControls: {
		title: formControls.text,
	},
});

export default Navbar;
