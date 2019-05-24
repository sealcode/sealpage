const Sealious = require('sealious');
const components_map = require('./components/index');

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

async function renderPreview(elements) {
	let html = '';

	for (const [componentName, componentProps] of elements) {
		html += await components_map[componentName].render(componentProps);
	}

	return html;
}

module.exports = config => {
	const app = new Sealious.App(config, manifest);

	for (const type in fieldTypes) {
		fieldTypes[type](app);
	}

	app.WwwServer.custom_route(
		'POST',
		'/api/v1/render',
		async (app, context, { body }) => {
			return renderPreview(body);
		}
	);

	return app;
};
