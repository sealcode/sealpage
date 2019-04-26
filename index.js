const renderer = require('./lib/render-site.js');
const hashFile = require('./lib/hash-file.js');

module.exports = {
	build: async (output, sitemap) => renderer(output, sitemap),
	renderer,
	hashFile,
};
