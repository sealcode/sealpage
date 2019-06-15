const locreq = require('locreq')(__dirname);
const webpack = require('webpack');
const config = require('./webpack.config');
const path = require('path');
const fs = require('fs');
require('colors');

module.exports = async function(sitemap_path, debug_opt) {
	const outDir = locreq.resolve('./public-admin');
	const { app, plugins_path } = await require(sitemap_path)();

	let plugins_available = require('./utils/are-plugins-avaliable')(
		plugins_path
	);

	let expanded_plugins_path =
		path.relative(plugins_path || '.', '/') + plugins_path;

	app.WwwServer.static_route(outDir, '');
	const compiler = webpack(
		config(plugins_available ? [expanded_plugins_path] : [])
	);

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
