const Sealious = require('sealious');

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

module.exports = config => {
	const app = new Sealious.App(config, manifest);

	for (const type in fieldTypes) {
		fieldTypes[type](app);
	}

	return app;
};
