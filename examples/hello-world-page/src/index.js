const sealpage = require('../../../index');

const path = require('path');
const output = path.resolve(__dirname, '../public');
const sitemap = {
	index: require('./pages/index.html'),
	about: require('./pages/about/about.html'),
	contact: require('./pages/contact/contact.html'),
	portfolio: require('./pages/portfolio/portfolio.html'),
};

console.log(sitemap);

sealpage.build(output, sitemap);

console.log('bum');
