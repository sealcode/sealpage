const OptimizeImage = require('./optimize-image');
const OptimizeSVG = require('./optimize-svg/optimize-svg');

module.exports = {
	image: {
		mime_regex: /image\/(jpg|png|jpeg|webp|gif)/,
		optimize_fn: OptimizeImage,
		data_type: 'raw',
	},
	svg: {
		mime_regex: /image\/svg\+xml/,
		optimize_fn: OptimizeSVG,
		data_type: 'utf-8',
	},
};
