const Sealious = require('sealious');
const components_map = require('./components/index');
const S = require('./lib/s');
const path = require('path');
const fs = require('fs');
const uuidv4 = require('uuid/v4');
const util = require('util');
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

	const component_instances = {};
	const path_prefix = `/previews/${uuid}`;
	const s = new S({ output_dir, path_prefix });

	// creating componentsinstances
	for (const component_name in components_map) {
		component_instances[component_name] = new components_map[
			component_name
		](s);
	}

	// render preview using component instances
	for (const [componentName, componentProps] of elements) {
		html += await component_instances[componentName].render(componentProps);
	}

	await writeFile(`${output_dir}/index.html`, html);

	return `${path_prefix}/index.html?${uuidv4()}`;
}

module.exports = config => {
	const app = new Sealious.App(config, manifest);

	for (const type in fieldTypes) {
		fieldTypes[type](app);
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
};
