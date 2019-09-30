//Checks if user has necessary fonts. If not, download them.

import fs from 'fs';
import cp from 'child_process';
import { promisify } from 'util';
const exec = promisify(cp.exec);
const access = promisify(fs.access);
import lq from 'locreq';
const locreq = lq(__dirname);
import colors from 'colors';

async function fonts_require() {
	//Add required fonts to the dictionary
	const necessary_fonts = {
		'ibm-plex-sans': ['regular', 500, 600, 700],
	};

	console.log('Checking required fonts...');

	let are_fonts_present = false;
	const font_names = Object.keys(necessary_fonts);

	//Each font's files lie in a dir named after font in the fonts directory
	for (let font_name of font_names) {
		are_fonts_present = await access(
			locreq.resolve('assets/fonts/' + font_name)
		).catch(err => new Error(err));
	}

	if (are_fonts_present instanceof Error) {
		console.log(colors.yellow('Fonts not present, downloading necessary fonts...'));
		for (let font of font_names) {
			const dest = `${locreq.resolve('assets/fonts')}/${font}`;
			const { stdout } = await exec(
				`mkdir -p ${dest} &&
	        wget -O ${font}.zip "https://google-webfonts-helper.herokuapp.com/api/fonts/${font}?download=zip&subsets=latin-ext&variants=${necessary_fonts[font]}" &&
	        unzip -j ${font}.zip -d ${dest} &&
	        rm ./${font}.zip;`
			).catch(err => console.error(err));
			console.log(stdout);
		}
	} else {
		console.log(colors.green('All fonts are available, proceeding...'));
	}
}

export default fonts_require;
