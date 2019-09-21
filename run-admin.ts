const locreq = require('locreq')(__dirname);
import webpack from 'webpack';
import config from './webpack.config';
import path from 'path';
import fonts_require from './utils/fonts-require';
import icons_require from './utils/icons-require';
import are_external_components_available from './utils/are-external-components-available';
import colors from 'colors';

export default async function(sitemap_path, debug_opt) {
	const outDir = locreq.resolve('./public-admin');
	const { app, ec_path } = await require(sitemap_path)();

	const ec_available = are_external_components_available(ec_path);

	const expanded_ec_path = path.relative(ec_path || '.', '/') + ec_path;

	//Require necessary fonts
	await fonts_require();
	await icons_require();

	app.WwwServer.static_route(outDir, '');
	const compiler = webpack(config(ec_available ? [expanded_ec_path] : []));

	compiler.watch(
		{
			ignored: /node_modules/,
		},
		(_, stats) => {
			//Detailed compiler output
			if (debug_opt) console.log(stats);
			console.log(colors.blue(colors.bgYellow('Build successful')));
			console.log(stats.toString('errors-warnings'));
		}
	);
}
