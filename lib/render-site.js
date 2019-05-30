const bluebird = require('bluebird');
const colors = require('colors');
const fs = require('fs');
const path = require('path');

const util = require('util');
const exists = util.promisify(fs.exists);
const mkdir = util.promisify(fs.mkdir);
const writeFile = util.promisify(fs.writeFile);

async function renderPage(page_content, file_path) {
	const dir = path.resolve(file_path, '..');
	if (!(await exists(dir))) {
		await mkdir(dir, { recursive: true });
	}
	await writeFile(file_path, page_content);
	console.log('rendered'.gray, file_path.green);
}

async function renderSite(site_description, directory) {
	await bluebird.map(Object.keys(site_description), async page_name => {
		if (!(site_description[page_name] instanceof Function)) {
			throw new Error('expected a function');
		}

		const result = await site_description[page_name]();

		/* eslint-disable indent */
		typeof result === 'string'
			? await renderPage(
					result,
					path.resolve(directory, `./${page_name}.html`)
			  )
			: await renderSite(result, path.resolve(directory, page_name));
		/* eslint-enable indent */
	});
}

module.exports = renderSite;
