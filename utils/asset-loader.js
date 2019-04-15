const fs = require("fs");
const path = require("path");
const { promisify } = require("util");
const hashFile = require("../lib/hash-file.js");

const copyFile = promisify(fs.copyFile);
const exists = promisify(fs.access);
const readFile = promisify(fs.readFile);
const makeDir = promisify(fs.mkdir);

async function pathExists(thePath) {
	try {
		await exists(thePath);
		return true;
	} catch (e) {
		return false;
	}
}

module.exports = dir => ({
	asset: async file => {
		const file_path = path.join(dir, file);
		if (!(await pathExists(file_path))) {
			console.error(`Could not load asset: '${file_path}'`.red);
			return "";
		}
		const out_dir = "public/assets/";
		if (!(await pathExists(out_dir))) {
			await makeDir(out_dir);
		}

		const file_extension = path.extname(file);
		const out_file_path = `${path.basename(
			file,
			file_extension
		)}-${await hashFile(file_path)}${file_extension}`;

		if (!(await pathExists(`${out_dir}${out_file_path}`))) {
			await copyFile(file_path, `${out_dir}${out_file_path}`);
		}
		return `/assets/${out_file_path}`;
	},
	assetContent: async file => {
		const file_path = path.join(dir, file);
		if (!(await pathExists(file_path))) {
			console.error(`Could not load asset: '${file_path}'`.red);
			return "";
		}

		return readFile(file_path);
	},
});
