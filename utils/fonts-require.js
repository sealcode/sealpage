//Checks if user has necessary fonts. If not, download them.

const fs = require('fs');
const cp = require('child_process');
const { promisify } = require('util');
const exec = promisify(cp.execFile);
const access = promisify(fs.access);
const { resolve } = require('path');
require('colors');

async function fonts_require() {
	//Add required fonts to the dictionary
	const necessary_fonts = {
		'ibm-plex-sans': ['regular', 500, 600, 700],
	};

	const root_path = resolve(__dirname, '../');
	console.log('Checking required fonts...');

	let are_fonts_present = false;
	const font_names = Object.keys(necessary_fonts);

	//Each font's files lie in a dir named after font in the fonts directory
	for (let font_name of font_names) {
		are_fonts_present = await access(
			resolve(__dirname, `../assets/fonts/${font_name}`)
		).catch(err => new Error(err));
	}

	if (are_fonts_present instanceof Error) {
		console.log('Fonts not present, downloading necessary fonts...'.yellow);
		for (let font of font_names) {
			const dest = `${root_path}/assets/fonts/${font}`;
			cp.exec(
				`echo $font &&
				mkdir -p ${dest}
	        wget -O ${font}.zip "https://google-webfonts-helper.herokuapp.com/api/fonts/${font}?download=zip&subsets=latin-ext&variants=${necessary_fonts[font]}" &&
	        unzip -j ${font}.zip -d ${dest} &&
	        rm ./${font}.zip;`,
				function(error, stdout, stderr) {
					if (error) throw new Error(error);
					console.log(stdout);
				}
			);
		}
	} else {
		console.log('All fonts are available, proceeding...'.green);
	}
}

module.exports = fonts_require;
