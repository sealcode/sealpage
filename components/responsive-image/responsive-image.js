const Component = require('../component.class');

/*
    image_path: string
	resolutions: array of sizes ie. [200, 150 ...]
	quality: number, quality of the resized image
    sizes_attr: string, sizes attribute for responsive img html tag
    alt: string, img's alt attribute
*/

class ResponsiveImage extends Component {
	async renderFn(
		s,
		{
			image_path,
			resolutions = [100, 400, 900, 1000, 1300],
			quality = 80,
			sizes_attr,
			alt = '',
		}
	) {
		const sharp = s.node_require('sharp');
		const path = s.node_require('path');
		const { promisify } = s.node_require('util');
		const locreq = s.node_require('locreq')(__dirname);
		const fs = s.node_require('fs');
		const hashFile = s.node_require(
			path.resolve(__dirname, '../../lib/hash-file.js')
		);
		if (!image_path) {
			image_path = locreq.resolve('assets/sealpage-logo.png');
		}
		const readFile = promisify(fs.readFile);

		let image_basename = path.basename(image_path); //Extract file's name
		const extension = path.extname(image_basename); //Get the file extension
		image_basename = path.basename(image_path, extension);

		const file_hash = hashFile(locreq.resolve(image_path)).substring(0, 8);

		const output_files = {};

		for (let resolution of resolutions) {
			const path = await s.addOutputFile({
				output_subdir: 'images',
				base_name: `${image_basename}-${resolution}.${extension}`,
				generator: () =>
					sharp(locreq.resolve(image_path))
						.resize(resolution)
						.jpeg({ quality })
						.toBuffer(),
				deps: [file_hash],
			});
			output_files[resolution] = path;
		}

		const median_resolution =
			resolutions[Math.round((resolutions.length - 1) / 2)];

		const srcset = resolutions
			.map(resolution => `${output_files[resolution]} ${resolution}w`)
			.join(',\n');

		return /* HTML */ `
			<img
				src="${output_files[median_resolution]}"
				srcset="${srcset}"
				sizes="${sizes_attr}"
				alt="${alt}"
			/>
		`;
	}
	static propsControls() {
		return {};
	}
}

module.exports = ResponsiveImage;
