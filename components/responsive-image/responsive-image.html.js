const Component = require('../component.class');

/*
	image_path: string
	out_path: string, output path
	resolutions: array of sizes ie. [200, 150 ...]
	quality: number, quality of the resized image
    sizes_attr: string, sizes attribute for responsive img html tag
    alt: string, img's alt attribute
    options: options parameters for certain formats i.e
    {
        jpg: { options },
        webp: { options }
        ....
    }
*/

class ResponsiveImage extends Component {
	async renderFn(
		s,
		{
			image_path,
			resolutions = [],
			quality = 80,
			sizes_attr,
			alt = '',
			options = {},
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
		const imgSize = s.node_require('image-size');

		if (!image_path) {
			image_path = locreq.resolve('assets/sealpage-logo.png');
		}

		//If resolutions array is not specified, fill it with values: 100, 200, ..., <img_width>
		if (resolutions.length === 0) {
			const { width } = imgSize(image_path);
			for (let size = 100; size < Math.min(4096, width); size += 100) {
				resolutions.push(size);
			}
			resolutions.push(width);
		}

		const readFile = promisify(fs.readFile);

		let image_basename = path.basename(image_path); //Extract file's name
		const extension = path.extname(image_basename).slice(1); //Get the file extension
		image_basename = path.basename(image_path, '.' + extension);

		const file_hash = hashFile(locreq.resolve(image_path)).substring(0, 8);

		const output_files = {
			webp: {},
			[extension]: {},
		};

		for (let ext of ['webp', extension]) {
			for (let resolution of resolutions) {
				const base_name = `${image_basename}-${resolution}.${ext}`;
				const path = await s.addOutputFile({
					output_subdir: 'images',
					base_name,
					generator: async () => {
						const sharp_resized = await sharp(
							locreq.resolve(image_path)
						).resize(resolution);

						return await sharp_resized
							.toFormat(ext, {
								quality,
								...(options[ext] || {}),
							})
							.toBuffer();
					},
					deps: [
						file_hash,
						resolutions,
						quality,
						sizes_attr,
						options[ext] || {},
					],
				});
				output_files[ext][resolution] = path;
			}
		}

		const srcset = Object.keys(output_files).map(ext =>
			resolutions
				.map(
					resolution =>
						`${output_files[ext][resolution]} ${resolution}w`
				)
				.join(',\n')
		);

		const median_resolution =
			resolutions[Math.round((resolutions.length - 1) / 2)];

		return /* HTML */ `
			<picture>
				<source
					srcset="${srcset[0]}"
					sizes="${sizes_attr}"
					alt="${alt}"/>
				<source
					srcset="${srcset[1]}"
					sizes="${sizes_attr}"
					alt="${alt}"/>
				<img
					src="${output_files[extension][median_resolution]}"
					alt="${alt}"
			/></picture>
		`;
	}
	static propsControls() {
		return { source_image: { control: 'image', label: 'Source image' } };
	}
}

module.exports = ResponsiveImage;
