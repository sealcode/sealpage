const Sealious = require('sealious');
const components_map = require('./components/index');
const S = require('./lib/s');
const path = require('path');
const fs = require('fs');

const util = require('util');
const writeFile = util.promisify(fs.writeFile);

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

async function renderPreview(uuid, elements, config) {
	let html = '';

	let output_dir = path.resolve(`/tmp/sealpage_bundle/${uuid}`);

	const component_instances = {};
	const s = new S({ output_dir });

	console.log(config);

	// creating instances

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

	return `${manifest.base_url}/previews/${uuid}/index.html`;
	// return html;
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
			return renderPreview(uuid.replace(/(\.|\/)/g, '-'), body, config);
		}
	);

	return app;
};
