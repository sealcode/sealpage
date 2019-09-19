const { resolve } = require('path');

class Settings {
	constructor(source) {
		this.source = source;
		this.settings = {
			page_name: {
				value: 'Brand new Sealpage site',
				type: 'text',
			},
			logo: {
				value: `${resolve(__dirname, '../assets/sealpage-logo.svg')}`,
				type: 'text',
			},
			primary_color: {
				value: '#fff',
				type: 'text',
			},
			secondary_color: {
				value: '#000',
				type: 'text',
			},
		};

		this.settings = { ...this.settings, ...source };
	}

	async addField({ key, value, type }) {
		this.settings = {
			...this.settings,
			[key]: {
				value,
				type,
			},
		};
	}

	async removeField(key) {
		if (!this.get(key)) {
			throw new Error('Setting not found: ' + key.toString());
		}
		delete this.settings[key];
	}

	async editField({ key, value, type }) {
		if (!this.get(key)) {
			throw new Error('Setting not found: ' + key.toString());
		}
		this.settings = {
			...this.settings,
			[key]: {
				value: value || this.settings[key].value,
				type: type || this.settings[key].type,
			},
		};
	}

	get(key) {
		return this.settings[key] || null;
	}

	getConfig() {
		return this.settings;
	}
}

module.exports = Settings;
