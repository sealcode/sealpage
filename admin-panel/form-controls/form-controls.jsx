const date = require('./date.jsx');
const text = require('./text.jsx');
const textarea = require('./textarea.jsx');
const image = require('./image.jsx');

module.exports = {};
module.exports.text = text;
module.exports.date = date;
module.exports.slug = text;
module.exports.textarea = textarea;
module.exports.image = image;
module.exports[
	'array-of-objects'
] = require('../body-page-editor/body-page-editor.jsx');
