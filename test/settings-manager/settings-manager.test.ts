import Settings from '../../lib/settings';
import * as assert from 'assert';

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
			require('./test-settings.json'),
			require('./test-settings'),
		]) {
			const sm = new Settings(source);

			assert.deepStrictEqual(
				[...default_settings, 'foo'],
				Object.keys(sm.getConfig())
			);
		}
	});

	it('should be able to create, read, edit and remove settings from the settings', async function() {
		const sm = new Settings();

		await sm.addField({ key: 'foo', value: 'bar', field_type: 'baz' });
		await sm.removeField('page_name');
		await sm.editField({ key: 'logo', value: 'ogol', field_type: 'seal' });

		const config = sm.getConfig();

		assert.equal(config.logo.value, 'ogol');
		assert.equal(config.logo.field_type, 'seal');
		assert.equal(config.foo.value, 'bar');
		assert.equal(config.foo.field_type, 'baz');
		assert.equal(config.page_name, undefined);
	});
});
