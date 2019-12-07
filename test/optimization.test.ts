const locreq = require('locreq')(__dirname);
const S = locreq('lib/s');
const { resolve } = require('path');
const { promisify } = require('util');
const { readFile } = require('fs');
const getSize = require('get-folder-size');
const read = promisify(readFile);
const size = promisify(getSize);
const assert = require('assert');
const rimraf = require('rimraf');
const remove_dir = promisify(rimraf);

const s_meta = (sample_name, preview_mode) => ({
	output_dir: resolve(__dirname, './test-tmp/', sample_name),
	path_prefix: `/previews/${sample_name}`,
	preview_mode,
});

async function add(s, opt) {
	const svg_file = resolve(__dirname, '../assets/sealpage-logo.svg');
	const png_file = resolve(__dirname, '../assets/sealpage-logo.png');

	await s.addOutputFile({
		output_subdir: 'images',
		base_name: 'test.svg',
		generator: async () => await read(svg_file),
		allow_optimize: opt,
	});

	await s.addOutputFile({
		output_subdir: 'images',
		base_name: 'test.png',
		generator: async () => await read(png_file),
		allow_optimize: opt,
	});
}

describe('optimization utils', function() {
	this.timeout(15000);
	it('should optimize files size when allow_optimize flag is enabled', async () => {
		const s_with_opt = new S(s_meta('with-opt'));
		const s_without_opt = new S(s_meta('without-opt'));

		await add(s_with_opt, true);
		await add(s_without_opt, false);

		const with_opt_size = await size(
			resolve(__dirname, './test-tmp/with-opt')
		);
		const without_opt_size = await size(
			resolve(__dirname, './test-tmp/without-opt')
		);

		assert.ok(with_opt_size <= without_opt_size);
	});
});

after(async () => {
	await remove_dir(resolve(__dirname, './test-tmp'));
});
