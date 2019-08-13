const { promisify } = require('util');
const fs = require('fs');
const cp = require('child_process');
const access = promisify(fs.access);
const { resolve } = require('path');
const exec = promisify(cp.exec);
require('colors');

async function icons_require() {
	const root_path = resolve(__dirname, '../');
	const dest = `${root_path}/assets/icons`;
	const extensions = ['.eot', '.svg', '.ttf', '.woff'];

	//Check if icons are already downloaded
	let are_icons_avaliable;

	for (const ext of extensions) {
		are_icons_avaliable = await access(
			resolve(root_path, `./assets/icons/dripicons-v2${ext}`)
		).catch(err => new Error(err));
	}

	if (are_icons_avaliable instanceof Error) {
		console.log('Icons not found, downloading...'.yellow);
		for (const ext of extensions) {
			await exec(`mkdir -p ${dest} &&
	        wget -O ${dest}/dripicons-v2${ext} "https://github.com/amitjakhu/dripicons/raw/master/webfont/fonts/dripicons-v2${ext}"`).catch(
				err => console.error(err)
			);
		}
		console.log('Fonts downloaded, proceeding...'.green);
		console.log('Downloading webicons.css file...'.yellow);

		await exec(
			`curl "https://raw.githubusercontent.com/amitjakhu/dripicons/master/webfont/webfont.css" | \
            sed "s,fonts\/,..\/assets\/icons\/," > ${root_path}/admin-panel/webicons.scss`
		).catch(err => console.error(err));
	} else {
		console.log('Icons found, proceeding...'.green);
	}
}

module.exports = icons_require;
