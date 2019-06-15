const fs = require('fs');
const path = require('path');

function arePluginsAvaliable(plugins_path) {
	if (plugins_path) {
		console.log('Plugin path provided. Checking the file...'.yellow);
		const relative_plugins_path =
			path.relative(plugins_path, '/') + plugins_path;

		try {
			fs.accessSync(relative_plugins_path, fs.constants.F_OK);
			require(path.relative(plugins_path, '/') + plugins_path);
			console.log('File succesfully found, proceeding...'.green);
			return true;
		} catch (error) {
			console.log('An error on import attempt occurred, aborting...'.red);
			console.log(error);
			return false;
		}
	}

	console.log('Plugins not found, omitting including process...');
	return false;
}

module.exports = arePluginsAvaliable;
