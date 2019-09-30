import renderer from '../lib/render-site';
import Navbar from '../components/navbar/navbar.html';
import * as path from 'path';
import * as fs from 'fs-extra';
import S from '../lib/s';
import * as assert from 'assert';

const test_folder = './test_output';

function deleteTestFiles() {
	try {
		fs.accessSync(path.resolve(__dirname, test_folder));
		fs.removeSync(path.resolve(__dirname, test_folder));
	} catch {
		console.log('Failed remove ', path.resolve(__dirname, test_folder));
		return;
	}
}

const s = new S({ output_dir: __dirname, path_prefix: '' });

after(function() {
	deleteTestFiles();
});

describe('Build tests', function() {
	it('Should render content', async function() {
		const sitemap = {
			index: async () => {
				return `<p> Sample tag </p>`;
			},
		};

		await renderer(sitemap, path.resolve(__dirname, test_folder), false);

		const created_file = path.resolve(__dirname, test_folder, 'index.html');

		fs.accessSync(created_file);
		const file_content = fs.readFileSync(created_file, {
			encoding: 'utf8',
		});

		assert.equal(file_content.trim(), `<p> Sample tag </p>`);
	});

	it('Should render content with Navbar component', async function() {
		const nav = new Navbar();

		const sitemap = {
			index: async () => {
				return nav.renderFn(s, { title: 'Sample Title' });
			},
		};
		await renderer(sitemap, path.resolve(__dirname, test_folder), false);

		const created_file = path.resolve(__dirname, test_folder, 'index.html');

		fs.accessSync(created_file);
		const file_content = fs.readFileSync(created_file, {
			encoding: 'utf8',
		});

		assert.equal(file_content.trim(), `<nav>Sample Title</nav>`);
	});
});
