const fs = require('fs');
const path = require('path');
const util = require('util');

const access = util.promisify(fs.access);
const writeFile = util.promisify(fs.writeFile);

const md5 = require('md5');
const makeDir = require('make-dir');
const bluebird = require('bluebird');

class S {
	constructor({ output_dir, path_prefix = '' }) {
		this.output_dir = output_dir;
		this.path_prefix = path_prefix; // for example: "/previews/92180392ueu093"
		this.style_hashes_order = [];
		this.style_hash_to_style = new Map();
	}

	async addOutputFile({ output_subdir, base_name, generator, deps }) {
		const hash = deps === null ? '' : md5(JSON.stringify(deps));

		let output_filename = base_name;

		if (hash) {
			output_filename = base_name.split('.');
			output_filename.splice(output_filename.length - 1, 0, hash);
			output_filename = output_filename.join('.');
		}

		if (output_subdir[0] === '/') {
			output_subdir = '.' + output_subdir;
		}

		const output_path = path.resolve(
			this.output_dir,
			output_subdir,
			output_filename
		);

		try {
			await access(path.resolve(output_path, '..'));
		} catch (error) {
			if (error.code === 'ENOENT') {
				await makeDir(path.resolve(output_path, '..'));
			} else throw error;
		}

		let file_exists = true;

		try {
			await access(output_path);
		} catch (error) {
			file_exists = false;
		}

		if (!file_exists || deps === null) {
			await writeFile(output_path, await generator());
		}
		return path.join(this.path_prefix, output_subdir, output_filename);
	}

	async renderSite(site_description) {
		console.log(path.resolve(this.output_dir));

		await bluebird.map(Object.keys(site_description), async page_name => {
			if (!(site_description[page_name] instanceof Function)) {
				throw new Error('expected a function');
			}

			const result = await site_description[page_name]();

			/* eslint-disable indent */
			typeof result === 'string'
				? // ? await renderPage(
				  // 		result,
				  // 		path.resolve(directory, `./${page_name}.html`)
				  //   )
				  await this.addOutputFile({
						output_subdir: '',
						base_name: `${page_name}.html`,
						generator: () => result,
						deps: null,
				  })
				: await this.renderSite(result);
			/* eslint-enable indent */
		});
	}

	async addStyle(style) {
		console.log('addStyle');
		const hash = md5(style);
		if (!this.style_hash_to_style.has(hash)) {
			this.style_hashes_order.push(hash);
			this.style_hash_to_style.set(hash, style);
		}
	}

	getDeduplicatedStyles() {
		console.log('getDeduplicatedStyles');
		let a = this.style_hashes_order
			.map(hash => this.style_hash_to_style.get(hash))
			.join('\n');

		return this.style_hashes_order
			.map(hash => this.style_hash_to_style.get(hash))
			.join('\n');
	}

	async renderStyles() {
		console.log('renderStyles');
		await this.addOutputFile({
			output_subdir: '',
			base_name: 'styles.css',
			generator: () => this.getDeduplicatedStyles(),
			deps: null,
		});
	}

	node_require(module_name) {
		try {
			return require(module_name);
		} catch (e) {
			console.error(e);
			throw new Error(
				`Could not resolve module '${module_name}'. It might not be installed or you're running the s.node_require function in the browser, while it's only supposed to be called on backend side`
			);
		}
	}
}

module.exports = S;
