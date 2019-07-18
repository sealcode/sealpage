const Component = require('../component.class');

class RedText extends Component {
	renderFn(s, { text }) {
		s.addStyle('.red { color:red; }');
		return /* HTML */ `
			<p style="red">${text}</p>
		`;
	}
	static propsControls() {
		return {
			text: { label: 'Red text', control: 'text' },
		};
	}
}

module.exports = RedText;
