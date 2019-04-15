const resp_img = require("./responsive-image.html.js");
const fs = require("fs");
const assert = require("assert");
const path = require("path");

// Check if any of the test files already exist if so - delete them
beforeEach(function() {
	["200w", "300w"].forEach(suffix => {
		const file_path = path.resolve(
			__dirname,
			`../../../public/assets/test-img-02f66078${suffix}.jpg`
		);
		try {
			fs.accessSync(file_path, fs.constants.F_OK);
			fs.unlinkSync(
				path.resolve(
					__dirname,
					`../../../public/assets/test-img-02f66078-${suffix}.jpg`
				),
				err => {
					if (err) throw new Error(err);
				}
			);
		} catch {
			return;
		}
	});
});

//After test delete the test files
after(function() {
	["200w", "300w"].forEach(suffix => {
		fs.unlinkSync(
			path.resolve(
				__dirname,
				`../../../public/assets/test-img-02f66078-${suffix}.jpg`
			),
			err => {
				if (err) throw err;
			}
		);
	});
});

describe("responsive-image-creator", function() {
	it("Should create images with given resolutions", async function() {
		const file_path = path.resolve(__dirname, "./test-img.jpg");
		const resolutions = [200, 300];
		const resize_data = {
			image_path: file_path,
			resolutions,
			quality: 80,
			sizes_attr: "100px",
			alt_tag: "alt_tag",
		};
		await resp_img(resize_data).then(function() {
			resolutions.forEach(resolution => {
				fs.accessSync(
					path.resolve(
						__dirname,
						`../../../public/assets/test-img-02f66078-${resolution}w.jpg`
					),
					fs.constants.F_OK,
					err => {
						assert(!err);
					}
				);
			});
		});
	});

	it("Should resolve a valid responsive html img tag", async function() {
		const file_path = path.resolve(__dirname, "./test-img.jpg");
		const resolutions = [200, 300];
		const resize_data = {
			image_path: file_path,
			resolutions,
			quality: 80,
			sizes_attr: "100px",
			alt_tag: "alt_tag",
		};
		const result = await resp_img(resize_data);
		assert(
			result,
			/* HTML */
			`
				<img
					src="${file_path}"
					srcset="/assets/test-img-02f66078-200w.jpg,\n/assets/test-img-02f66078-300w.jpg"
					sizes="100px"
					alt="alt_tag"
				/>
			`
		);
	});
});
