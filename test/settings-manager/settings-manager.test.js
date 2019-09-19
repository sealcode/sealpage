const Settings = require('../lib/settings');
const fs = require('fs');
const assert = require('assert');

describe('Settings', function() {
	it('should load and add config from the provided source', async function() {
		const default_settings = [
			'page_name',
			'logo',
			'primary_color',
			'secondary_color',
		];

		for (const source of [
			{ foo: 'bar' },
			'./test-settings.js',
			'./test-settings.json',
		]) {
			const sm = new Settings(source);
			assert.deepStrictEqual(
				[...default_settings, 'foo'],
				Object.keys(sm.getConfig())
			);
		}
	});

	it('should be able to create, read, edit and remove settings from the settings', async function() {
		const sm = new Settings(__dirname);

		await sm.addField({ key: 'foo', value: 'bar', type: 'baz' });
		await sm.removeField('page_name');
		await sm.editField({ key: 'logo', value: 'ogol', type: 'seal' });

		const config = sm.getConfig();

		assert.equal(config.logo.value, 'ogol');
		assert.equal(config.logo.type, 'seal');
		assert.equal(config.foo.value, 'bar');
		assert.equal(config.foo.type, 'baz');
		assert.equal(config.page_name, undefined);
	});
});
