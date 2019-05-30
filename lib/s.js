const fs = require('fs');
const path = require('path');
const util = require('util');

const fileExists = util.promisify(fs.access);
const writeFile = util.promisify(fs.writeFile);

const md5 = require('md5');

class S {
	constructor({ output_dir }) {
		this.output_dir = output_dir;
	}

	async addOutputFile({ relative_path, base_name, generator, deps }) {
		const hash = md5(JSON.stringify(deps));

		let output_filename = base_name.split('.');
		output_filename.splice(output_filename.length - 1, 0, hash);
		output_filename.join('.');

		const output_path = path.resolve(
			this.output_dir,
			relative_path,
			output_filename
		);

		try {
			await fileExists(output_path);
		} catch (error) {
			await writeFile(output_path, await generator());
		}

		return output_path;
	}
}

module.exports = S;
