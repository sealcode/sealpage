const md5file = require("md5-file");

function hashFile(file) {
	return md5file.sync(file);
}

module.exports = hashFile;
