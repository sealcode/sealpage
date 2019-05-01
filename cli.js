#!/usr/bin/env node
const sealpage = require('./index');
const path = require('path');

require('yargs')
	.command(
		'build <sitemap_path> <output_dir>',
		'start builder',
		yargs => {
			return yargs
				.positional('sitemap_path', {
					describe: 'The path to sitemap config',
					type: 'string',
				})
				.positional('output_dir', {
					describe: 'The directory to output',
					type: 'string',
				});
		},
		async argv => {
			await sealpage.build(
				path.resolve(process.env.PWD, argv.sitemap_path),
				path.resolve(process.env.PWD, argv.output_dir)
			);
			process.exit(0);
		}
	)
	.demandCommand()
	.help()
	.wrap(80).argv;
