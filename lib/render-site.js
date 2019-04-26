const fs = require('fs');
const path = require('path');
const util = require('util');
const colors = require('colors');
const bluebird = require('bluebird');

const writeFile = util.promisify(fs.writeFile);
const exists = util.promisify(fs.exists);
const mkdir = util.promisify(fs.mkdir);

async function renderPage(file_path, page_content) {
	const dir = path.resolve(file_path, '..');
	if (!(await exists(dir))) {
		await mkdir(dir, { recursive: true });
	}
	await writeFile(file_path, page_content);
	console.log('wrote'.gray, file_path.gray);
}

async function renderSite(directory, site_description) {
	console.log('directory, site_description', directory, site_description);

	await bluebird.map(Object.keys(site_description), async page_name => {
		if (!(site_description[page_name] instanceof Function)) {
			throw new Error('expected a function');
		}
		const result = await site_description[page_name]();

		if (typeof result === 'string') {
			console.log('site_description[page_name]', result);
			return renderPage(
				path.resolve(directory, `./${page_name}.html`),
				result
			);
		} else {
			const a = renderSite(path.resolve(directory, page_name), result);
			console.log(a);
			return a;
		}
	});
}

module.exports = renderSite;
