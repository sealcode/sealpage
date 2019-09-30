import * as fs from 'fs'
import * as path from 'path';
import * as util from 'util'

const access = util.promisify(fs.access);
const writeFile = util.promisify(fs.writeFile);

const md5 = require('md5');
const makeDir = require('make-dir');
const { components } = require('../components');

class S {
	constructor({ output_dir, path_prefix }) {
		this.output_dir = output_dir;
		this.path_prefix = path_prefix; // for example: "/previews/92180392ueu093"

		//Initialize all components
		this.components = {};

		// creating components instances
		for (const component_name in components) {
			this.components[component_name] = new components[component_name](
				this
			);
		}
	}

	get Settings() {
		return this.constructor.Settings;
	}

	async addOutputFile({ output_subdir, base_name, generator, deps }) {
		const hash = md5(JSON.stringify(deps));

		let output_filename = base_name.split('.');
		output_filename.splice(output_filename.length - 1, 0, hash);
		output_filename = output_filename.join('.');

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

		try {
			await access(output_path);
		} catch (error) {
			await writeFile(output_path, await generator());
		}
		return path.join(this.path_prefix, output_subdir, output_filename);
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

export default S;
