const Component = require('../component.class');

class DownloadFileButton extends Component {
	async renderFn(s, { text }) {
		const fs = s.node_require('fs');
		const util = s.node_require('util');
		const path = s.node_require('path');

		const readFile = util.promisify(fs.readFile);
		/* eslint-disable indent */
		return /* HTML */ `
			<a
				href="${
					await s.addOutputFile({
						output_subdir: './assets/images/',
						base_name: 'example-file.png',
						generator: async function() {
							return await readFile(
								path.resolve(__dirname, './example-file.png')
							);
						},
						deps: [],
					})
				}"
				>${text}</a
			>
		`;
		/* eslint-enable indent */
	}
	static propsControls() {
		return { text: { control: 'text', label: 'Button text' } };
	}
}

module.exports = DownloadFileButton;
