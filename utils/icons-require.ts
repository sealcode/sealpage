import { promisify } from 'util';
import fs from 'fs';
import cp from 'child_process';
const access = promisify(fs.access);
import { resolve } from 'path';
const exec = promisify(cp.exec);
import colors from 'colors';

async function icons_require() {
	const root_path = resolve(__dirname, '../../');
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
		console.log(colors.yellow('Icons not found, downloading...'));
		for (const ext of extensions) {
			await exec(`mkdir -p ${dest} &&
	        wget -O ${dest}/dripicons-v2${ext} "https://github.com/amitjakhu/dripicons/raw/master/webfont/fonts/dripicons-v2${ext}"`).catch(
				err => console.error(err)
			);
		}
		console.log(colors.green('Fonts downloaded, proceeding...'));
		console.log(colors.yellow('Downloading webicons.css file...'));

		await exec(
			`curl "https://raw.githubusercontent.com/amitjakhu/dripicons/master/webfont/webfont.css" | \
	 			sed "s,fonts\/,..\/assets\/icons\/," > ${root_path}/admin-panel/webicons.scss`
		).catch(err => console.error(err));
	} else {
		console.log(colors.green('Icons found, proceeding...'));
	}
}

export default icons_require;
