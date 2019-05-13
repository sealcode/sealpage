const date = require('./date.jsx');
const text = require('./text.jsx');
const textarea = require('./textarea.jsx');
const bodyPageEditor = require('../body-page-editor/body-page-editor.jsx');

const FormControls = {
	text,
	date,
	slug: text,
	textarea,
	'array-of-objects': bodyPageEditor,
};

module.exports = FormControls;
