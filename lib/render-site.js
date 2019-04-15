const fs = require('fs');
const path = require('path');
const util = require('util');
const colors = require('colors');

const writeFile = util.promisify(fs.writeFile);
const exists = util.promisify(fs.exists);
const mkdir = util.promisify(fs.mkdir);

async function renderPage(file_path, page_generator) {
	const text = await page_generator();
	const dir = path.resolve(file_path, '..');
	if (!(await exists(dir))) {
		await mkdir(dir, { recursive: true });
	}
	await writeFile(file_path, text);
	console.log('wrote'.gray, file_path.gray);
}

async function renderSite(directory, site_description) {
	await Promise.all(
		Object.keys(site_description).map(page_name =>
			site_description[page_name] instanceof Function
				? renderPage(
					path.resolve(directory, `./${page_name}.html`),
					site_description[page_name]
				  )
				: renderSite(
					path.resolve(directory, page_name),
					site_description[page_name]
				  )
		)
	);
}

module.exports = renderSite;
