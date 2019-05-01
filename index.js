const getApp = require('./get-app.js');
const hashFile = require('./lib/hash-file.js');
const pageForEveryItem = require('./lib/page-for-every-item.js');
const renderer = require('./lib/render-site.js');
const runAdmin = require('./run-admin.js');

const build = async function(sitemap_path, output_dir) {
	const sitemap = await require(sitemap_path)();
	return renderer(sitemap, output_dir);
};

const components = {
	Navbar: require('./components/navbar/navbar.html.js'),
	Markdown: require('./components/markdown/markdown.html.js'),
};

module.exports = {
	build,
	components,
	getApp,
	hashFile,
	pageForEveryItem,
	renderer,
	runAdmin,
};
