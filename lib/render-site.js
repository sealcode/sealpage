const bluebird = require('bluebird');
const colors = require('colors');
const fs = require('fs');
const path = require('path');
const S = require('./s');

const util = require('util');
const exists = util.promisify(fs.exists);
const mkdir = util.promisify(fs.mkdir);
const writeFile = util.promisify(fs.writeFile);

// async function renderPage(page_content, file_path) {
// 	const dir = path.resolve(file_path, '..');
// 	if (!(await exists(dir))) {
// 		await mkdir(dir, { recursive: true });
// 	}
// 	await writeFile(file_path, page_content);
// 	console.log('rendered'.gray, file_path.green);
// }

async function renderSite(site_description, output_dir) {
	const s = new S({ output_dir });
	console.log(site_description, output_dir);
	await s.renderSite(site_description);
	await s.renderStyles();
}

module.exports = renderSite;
