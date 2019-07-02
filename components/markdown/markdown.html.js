const Component = require('../component.class');
const marked = require('marked');

class Markdown extends Component {
	renderFn(s, { markdown_source }) {
		return marked(markdown_source || '');
	}

	static propsControls() {
		return {
			markdown_source: { label: 'Markdown source', control: 'textarea' },
		};
	}
}

module.exports = Markdown;
