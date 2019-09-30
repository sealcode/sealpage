import { resolve } from 'path';

export type Setting = {
	value: string;
	field_type: string;
};

export type SettingsInstance = {
	[setting_name: string]: Setting;
};

class Settings {
	readonly default_settings = {
		page_name: {
			value: 'Brand new Sealpage site',
			field_type: 'text',
		},
		logo: {
			value: `${resolve(__dirname, '../assets/sealpage-logo.svg')}`,
			field_type: 'text',
		},
		primary_color: {
			value: '#fff',
			field_type: 'text',
		},
		secondary_color: {
			value: '#000',
			field_type: 'text',
		},
	};

	public source: SettingsInstance;
	public settings: SettingsInstance;

	constructor(source: SettingsInstance = {}) {
		this.settings = { ...this.default_settings, ...source };
	}

	async addField(args: {
		key: string;
		value: string;
		field_type: string;
	}): Promise<void> {
		const { key, value, field_type } = args;
		this.settings = {
			...this.settings,
			[key]: {
				value,
				field_type,
			},
		};
	}

	async removeField(key: string): Promise<void> {
		if (!this.get(key)) {
			throw new Error('Setting not found: ' + key.toString());
		}
		delete this.settings[key];
	}

	async editField(args: {
		key: string;
		value: string;
		field_type: string;
	}): Promise<void> {
		const { key, value, field_type } = args;
		if (!this.get(key)) {
			throw new Error('Setting not found: ' + key.toString());
		}
		this.settings = {
			...this.settings,
			[key]: {
				value: value || this.settings[key].value,
				field_type: field_type || this.settings[key].field_type,
			},
		};
	}

	get(key: string): Setting | null {
		return this.settings[key] || null;
	}

	getConfig(): SettingsInstance {
		return this.settings;
	}
}

export default Settings;
