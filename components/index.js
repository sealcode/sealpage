const Markdown = require('./markdown/markdown.html');
const Navbar = require('./navbar/navbar.html');
const DownloadFileButton = require('./download-file-button/download-file-button');
const ResponsiveImage = require('./responsive-image/responsive-image.html.js');
const RedText = require('./red-text/red-text.html');

const components = {
	Markdown,
	Navbar,
	DownloadFileButton,
	ResponsiveImage,
	RedText,
};

function register(externalComponents) {
	for (let i = 0; i < externalComponents.length; i++) {
		const name = externalComponents[i].name;

		if (!name)
			throw new Error(
				'Name must be provided for the user defined External Component'
			);

		if (components[name])
			throw new Error(
				`External Components registration process failed. There have been naming conflicts that have to be resolved first: ${name}`
			);
		components[name] = externalComponents[i].component;
	}
}

module.exports = {
	components,
	register,
};
