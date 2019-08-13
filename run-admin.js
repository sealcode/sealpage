const locreq = require('locreq')(__dirname);
const webpack = require('webpack');
const config = require('./webpack.config');
const path = require('path');
const fonts_require = require('./utils/fonts-require');
const icons_require = require('./utils/icons-require');
require('colors');

module.exports = async function(sitemap_path, debug_opt) {
	const outDir = locreq.resolve('./public-admin');
	const { app, ec_path } = await require(sitemap_path)();

	let ec_available = require('./utils/are-external-components-avaliable')(
		ec_path
	);

	let expanded_ec_path = path.relative(ec_path || '.', '/') + ec_path;

	//Require necessary fonts
	await fonts_require();
	await icons_require();

	app.WwwServer.static_route(outDir, '');
	const compiler = webpack(config(ec_available ? [expanded_ec_path] : []));

	compiler.watch(
		{
			aggregateTimeout: 100,
			poll: true,
		},
		(err, stats) => {
			if (err) throw new Error(err);
			//Detailed compiler output
			if (debug_opt) console.log(stats);
			console.log('Build successful'.blue.bgYellow);
		}
	);
};
