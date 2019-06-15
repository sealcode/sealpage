const Markdown = require('./markdown/markdown.html');
const Navbar = require('./navbar/navbar.html');

const components = {
	Markdown,
	Navbar,
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
