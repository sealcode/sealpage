const svgo = require('./svgo-config');
const md5 = require('md5');

async function OptimizeSVG(svg) {
	const opt_query = await svgo.optimize(svg, { path: '/tmp/svg' + md5(svg) });
	return opt_query.data;
}

module.exports = OptimizeSVG;
