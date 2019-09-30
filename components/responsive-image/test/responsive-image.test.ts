import ResponsiveImage from '../responsive-image.html';
import * as fs from 'fs';
import * as assert from 'assert';
import * as path from 'path';
import { execSync } from 'child_process';
import { DomHandler, Parser, DomElement } from 'htmlparser2';
import { promisify } from 'util';
import S from '../../../lib/s';
import * as locreq from 'locreq';

const readdir = promisify(fs.readdir);
const lrq = locreq(__dirname);

const s = new S({ output_dir: __dirname, path_prefix: '' });

const resolutions = [200, 300];
const file_path = lrq.resolve('dist/assets/test-img.jpg');

const resize_data = {
	image_path: file_path,
	resolutions,
	quality: 80,
	sizes_attr: '100px',
	alt: 'alt',
};

function deleteTestFiles() {
	try {
		fs.accessSync(path.resolve(__dirname, './images'));
		execSync(`rm -rf ${path.resolve(__dirname, './images')}`);
	} catch {
		return;
	}
}

// Check if any of the test files already exist if so - delete them
beforeEach(function() {
	deleteTestFiles();
});

describe('responsive-image-creator', function() {
	it('Should create images with given resolutions', async function() {
		const result = await new ResponsiveImage(s).render(resize_data);
		const files = await readdir(
			path.resolve(__dirname, './images'),
			'utf-8'
		).catch(err => {
			throw new Error(err);
		});

		assert.equal(files.length, 4);

		const pattern = new RegExp(/test-img-\d{3}\.[a-z0-9]{32}\.(webp|jpg)/);
		for (let file of files) {
			assert(pattern.test(file));
		}
	});

	it('Should resolve a valid responsive html picture tag', async function() {
		const result = await new ResponsiveImage(s).render(resize_data);
		const handler: DomHandler = new DomHandler(
			function(err, dom): void {
				if (err) throw new Error(err);
				const picture_node: any = dom.find(
					node => node.name === 'picture' && node.type === 'tag'
				);
				for (const child of (picture_node as DomElement)
					.children as Array<any>) {
					if (child.name === 'source') {
						assert(
							/images\/test-img-\d{3}\.[a-z0-9]{32}\.(webp|jpg)\s[0-9]{3}w/.test(
								child.attribs.srcset
							)
						);
					}
				}
			},
			{ normalizeWhitespace: true }
		);
		const parser = new Parser(handler);
		parser.write(result);
		parser.end();
	});

	it('Should change hash if input file or deps changed', async function() {
		const changed_image_data = {
			...resize_data,
			image_path: lrq.resolve('dist/assets/test-img-2.jpg'),
		};

		const changed_dependency_data = {
			...resize_data,
			resolutions: [100],
		};

		await new ResponsiveImage(s).render(resize_data);
		await new ResponsiveImage(s).render(changed_image_data);
		await new ResponsiveImage(s).render(changed_dependency_data);

		const files = await readdir(
			path.resolve(__dirname, './images'),
			'utf-8'
		).catch(err => {
			throw new Error(err);
		});

		const first_hash = files[0].split('.')[1];
		const second_hash = files[files.length - 1].split('.')[1];
		const third_hash = files[2].split('.')[1];

		assert.notEqual(first_hash, second_hash);
		assert.notEqual(first_hash, third_hash);
		assert.notEqual(second_hash, third_hash);
	});

	it('Should create a resolution array with specified values if not provided', async function() {
		const changed_resolutions_data = {
			...resize_data,
			resolutions: [],
		};

		await new ResponsiveImage(s).render(changed_resolutions_data);

		const files = await readdir(
			path.resolve(__dirname, './images'),
			'utf-8'
		).catch(err => {
			throw new Error(err);
		});

		assert(files.length !== 0);
	});
});

//After test delete the test files
after(function() {
	deleteTestFiles();
});
