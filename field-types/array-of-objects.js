const Sealious = require('sealious');

module.exports = app =>
	app.createChip(Sealious.FieldType, {
		name: 'array-of-objects',
		is_proper_value: (context, params, new_value) => {
			if (!Array.isArray(new_value)) {
				return Promise.reject('It should be array of objects.');
			}

			for (const value of new_value) {
				if (typeof value !== 'object') {
					return Promise.reject('One of array item isn\'t object.');
				}
			}
			return Promise.resolve();
		},
	});
