import * as md5file from 'md5-file';

function hashFile(file) {
	return md5file.sync(file);
}

export default hashFile;
