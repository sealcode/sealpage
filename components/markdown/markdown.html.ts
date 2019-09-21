import Component from '../component.class';
import marked from 'marked';

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

export default Markdown;
