import Component from '../component.class';
import formControls from '../../admin-panel/form-controls/form-controls';
import marked from 'marked';

const Markdown = new Component({
	renderFn: ({ markdown_source }) => {
		return marked(markdown_source || '');
	},
	propsControls: {
		markdown_source: formControls.textarea,
	},
});

export default Markdown;
