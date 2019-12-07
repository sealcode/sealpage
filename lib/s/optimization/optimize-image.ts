const imagemin = require('imagemin');
const imageminOptipng = require('imagemin-optipng');

async function OptimizeImage(buf) {
	return await imagemin.buffer(buf, {
		destination: '/tmp/sealpage-out/',
		plugins: [imageminOptipng()],
	});
}

module.exports = OptimizeImage;
