const Component = require('../component.class');
const fs = require('fs');
const util = require('util');
const path = require('path');

const readFile = util.promisify(fs.readFile);

class DownloadFileButton extends Component {
	async renderFn(s, { text }) {
		/* eslint-disable indent */
		return /* HTML */ `
			<a
				href="${await s.addOutputFile({
					relative_path: '/assets/images/',
					base_name: 'example-file.png',
					generator: async function() {
						return await readFile(
							path.resolve(__dirname, './example-file.png')
						);
					},
					deps: [],
				})}"
				>${text}</a
			>
		`;
		/* eslint-enable indent */
	}
	static propsControls() {
		return { text: 'text' };
	}
}

module.exports = DownloadFileButton;
