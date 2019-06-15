#!/usr/bin/env node
const sealpage = require('./index');
const path = require('path');

require('yargs')
	.command(
		'build [sitemap_path] [output_dir]',
		'start builder',
		yargs => {
			return yargs
				.positional('sitemap_path', {
					describe: 'The path to sitemap config',
					type: 'string',
					default: 'index.js',
				})
				.positional('output_dir', {
					describe: 'The directory to output',
					type: 'string',
					default: 'public',
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
	.command(
		'admin [sitemap_path]',
		'starts admin panel',
		yargs => {
			return yargs
				.positional('sitemap_path', {
					describe: 'The path to sitemap config',
					type: 'string',
					required: true,
					default: 'index.js',
				})
				.positional('debug', {
					describe: 'Enables detailed output about compilation',
					type: 'boolean',
					default: 'false',
				});
		},
		async argv => {
			await sealpage.runAdmin(
				path.resolve(process.env.PWD, argv.sitemap_path),
				argv.debug
			);
		}
	)
	.demandCommand()
	.help()
	.wrap(80).argv;
