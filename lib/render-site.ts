import * as bluebird from 'bluebird';
import * as fs from 'fs';
import * as path from 'path';
import * as util from 'util';
import colors from 'colors';

const exists = util.promisify(fs.exists);
const mkdir = util.promisify(fs.mkdir);
const writeFile = util.promisify(fs.writeFile);

async function renderPage(page_content, file_path, log = true) {
	const dir = path.resolve(file_path, '..');
	if (!(await exists(dir))) {
		await mkdir(dir, { recursive: true });
	}
	await writeFile(file_path, page_content);
	if (log) console.log('rendered'.grey, file_path.green);
}

async function renderSite(site_description, directory, log = true) {
	await bluebird.map(Object.keys(site_description), async page_name => {
		if (!(site_description[page_name] instanceof Function)) {
			throw new Error('expected a function');
		}

		const result = await site_description[page_name]();

		/* eslint-disable indent */
		typeof result === 'string'
			? await renderPage(
					result,
					path.resolve(directory, `./${page_name}.html`),
					log
			  )
			: await renderSite(result, path.resolve(directory, page_name), log);
		/* eslint-enable indent */
	});
}

export default renderSite;
