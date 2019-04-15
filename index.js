const renderer = require('./lib/render-site.js');

module.exports = {
	build: async (output, sitemap) => renderer(output, sitemap),
};
