import Sealious from 'sealious';
import S from './lib/s';
import path from 'path';
import fs from 'fs';
import uuidv4 from 'uuid/v4';
import util from 'util';
import Settings from './lib/settings';
const writeFile = util.promisify(fs.writeFile);
const exists = util.promisify(fs.access);
const mkdir = util.promisify(fs.mkdir);

const fieldTypes = {
	slug: require('./field-types/slug'),
	arrayOfObject: require('./field-types/array-of-objects'),
};

const manifest = {
	name: 'What Seal Do?',
	logo: './image.svg',
	version: '1.0',
	default_language: 'pl',
	base_url: 'http://localhost:8080',
	admin_email: 'sealpage_devs@sealcode.org',
};

async function renderPreview(uuid, elements) {
	let html = '';
	let temporary_path = `/tmp/sealpage_bundle/${uuid}`;

	try {
		await exists('/tmp/sealpage_bundle');
	} catch (error) {
		await mkdir('/tmp/sealpage_bundle');
	}

	try {
		await exists(temporary_path);
	} catch (error) {
		await mkdir(temporary_path);
	}

	let output_dir = path.resolve(temporary_path);

	const path_prefix = `/previews/${uuid}`;
	const s = new S({ output_dir, path_prefix, preview_mode: true });
	// render preview using component instances initialized by s object
	for (const [componentName, componentProps] of elements) {
		html += await s.components[componentName].render(componentProps);
	}

	await writeFile(`${output_dir}/index.html`, html);

	return `${path_prefix}/index.html?${uuidv4()}`;
}

export default function({ config, settings_source = {} }) {
	const app = new Sealious.App(config, manifest);

	S.Settings = new Settings(settings_source);

	for (const type in fieldTypes) {
		fieldTypes[type].default(app);
	}

	app.WwwServer.static_route(
		'/tmp/sealpage_bundle', // system path
		'/previews' // url
	);

	app.WwwServer.custom_route(
		'POST',
		'/api/v1/render',
		async (app, context, { uuid, body }) => {
			return renderPreview(uuid.replace(/(\.|\/)/g, '-'), body);
		}
	);

	return app;
}
