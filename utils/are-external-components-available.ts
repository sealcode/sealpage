import fs from 'fs';
import path from 'path';

function areExternalComponentsAvaliable(ec_path) {
	if (ec_path) {
		console.log(
			'External Components path provided. Checking the file...'.yellow
		);
		const relative_ec_path = path.relative(ec_path, '/') + ec_path;

		try {
			fs.accessSync(relative_ec_path, fs.constants.F_OK);
			require(path.relative(ec_path, '/') + ec_path);
			console.log('File succesfully found, proceeding...'.green);
			return true;
		} catch (error) {
			console.log('An error on import attempt occurred, aborting...'.red);
			console.log(error);
			return false;
		}
	}

	console.log('External Components not found, omitting including process...');
	return false;
}

export default areExternalComponentsAvaliable;
