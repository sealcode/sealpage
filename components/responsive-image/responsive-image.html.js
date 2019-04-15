const sharp = require("sharp");
const path = require("path");
const { promisify } = require("util");
const locreq = require("locreq")(__dirname);
const fs = require("fs");
const hashFile = require("../../../lib/hash-file.js");
const access = promisify(fs.access);

/*
    image_path: string
	resolutions: array of sizes ie. [200, 150 ...]
	quality: number, quality of the resized image
    sizes_attr: string, sizes attribute for responsive img html tag
    alt: string, img's alt attribute
*/

module.exports = async function({
	image_path,
	resolutions,
	quality = 80,
	sizes_attr,
	alt = "",
}) {
	try {
		const image_path_to_checksum = {};

		const created_files = await Promise.all(
			resolutions.map(async resolution => {
				let image_basename = path.basename(image_path); //Extract file's name
				const extension = path.extname(image_basename); //Get the file extension
				image_basename = path.basename(image_path, extension);
				if (!image_path_to_checksum[image_path]) {
					image_path_to_checksum[image_path] = hashFile(
						locreq.resolve(image_path)
					).substring(0, 8);
				}
				const checksum = image_path_to_checksum[image_path];
				const responsive_file_name = `${image_basename}-${checksum}-${resolution}w${extension}`;
				const destination = `/assets/${responsive_file_name}`;
				// If resized image already exists do not resize it again
				await access(locreq.resolve(image_path), fs.constants.OK).catch(
					() => {
						return -1;
					}
				);
				//Resize and save new, transformed file
				await sharp(locreq.resolve(image_path))
					.resize(resolution)
					.jpeg({ quality })
					.toFile(locreq.resolve(`public/${destination}`));
				return `${destination} ${resolution}w`;
			})
		);
		//Generate appropriate repsonsive img tag
		return /* HTML  */ `<img src="${image_path}" srcset="${created_files.join(
			",\n"
		)}" sizes="${sizes_attr}" alt="${alt}"/>`;
	} catch (error) {
		throw new Error(error);
	}
};
