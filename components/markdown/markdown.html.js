const Component = require('../component.class');
// const formControls = require('./../../admin-panel/form-controls/form-controls.jsx');
const marked = require('marked');

// console.log(formControls.textarea);

const Markdown = new Component({
	renderFn: ({ markdown_source }) => {
		return marked(markdown_source || '');
	},
	propsControls: {
		markdown_source: 'textarea',
	},
});

module.exports = Markdown;
