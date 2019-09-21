#!/usr/bin/env node

import * as sealpage from './index';
import path from 'path';
import { Argv } from 'yargs';

require('yargs')
	.command(
		'build [sitemap_path] [output_dir]',
		'start builder',
		(yargs: Argv) => {
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
		async (argv: any) => {
			await sealpage.build(
				path.resolve(process.env.PWD as string, argv.sitemap_path),
				path.resolve(process.env.PWD as string, argv.output_dir)
			);
			process.exit(0);
		}
	)
	.command(
		'admin [sitemap_path]',
		'starts admin panel',
		(yargs: Argv) => {
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
		async (argv: any) => {
			await sealpage.runAdmin(
				path.resolve(
					process.env.PWD as string,
					argv.sitemap_path as string
				),
				argv.debug
			);
		}
	)
	.demandCommand()
	.help()
	.wrap(80).argv;
