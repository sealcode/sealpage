const Sealious = require("sealious");
const assert = require("assert");

module.exports = app =>
	app.createChip(Sealious.FieldType, {
		name: "slug",
		extends: "text",
		is_proper_value: async (context, params, new_value) => {
			assert.equal(typeof params.field_to_check, "string");

			const collection_name = params.collection_name;

			assert.equal(typeof collection_name, "string");
			// await collection.fields[params.field_to_check].is_proper_value(
			// 	context,
			// 	new_value
			// );

			if (params.include_forbidden) {
				context = new app.Sealious.SuperContext();
			}

			const matches = (await app.run_action(
				context,
				["collections", collection_name],
				"show",
				{ filter: { [params.field_to_check]: new_value } }
			)).items;

			if (matches.length) {
				return Promise.reject(
					`There's already an item in ${collection_name} with ${
						params.field_to_check
					} set to ${new_value}`
				);
			}
			return Promise.resolve();
		},
	});
