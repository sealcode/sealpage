const { promisify } = require('util');
const fs = require('fs');
const writeFile = promisify(fs.writeFile);
const mime = require('mime/lite');
const opt_rules = require('./optimization-rules');

const optimizeMeIfYouCan = async (file, output_path) => {
	const mime_type = mime.getType(output_path);
	for (const [, rule] of Object.entries(opt_rules)) {
		if (rule.mime_regex.test(mime_type)) {
			const data = rule.data_type === 'utf-8' ? file.toString() : file;
			const optimized_data = await rule.optimize_fn(data);
			await writeFile(output_path, optimized_data);
		} else {
			await writeFile(output_path, file);
		}
	}
};

module.exports = optimizeMeIfYouCan;
