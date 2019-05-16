const Component = require('../component.class');
const marked = require('marked');

const Markdown = new Component({
	renderFn: ({ markdown_source }) => {
		return marked(markdown_source || '');
	},
	propsControls: {
		markdown_source: 'textarea',
	},
});

module.exports = Markdown;
