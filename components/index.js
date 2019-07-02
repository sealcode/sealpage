const Markdown = require('./markdown/markdown.html');
const Navbar = require('./navbar/navbar.html');
const DownloadFileButton = require('./download-file-button/download-file-button');
const ResponsiveImage = require('./responsive-image/responsive-image');

const components = {
	Markdown,
	Navbar,
	DownloadFileButton,
	ResponsiveImage,
};

function register(pluginComponents) {
	for (let i = 0; i < pluginComponents.length; i++) {
		const name = pluginComponents[i].name;
		if (components[name])
			throw new Error(
				`Plugins registration process failed. There have been naming conflicts that have to be resolved first: ${name}`
			);
		components[name] = pluginComponents[i];
	}
}

module.exports = {
	components,
	register,
};
