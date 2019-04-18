// const hashFile = require('../lib/hash-file.js');

const sealpage = require('../../../../index');

const styleCssHash = sealpage.hashFile('../public/styles/style.css');

module.exports = async (body /* HTML */) =>
	`<!DOCTYPE html>
<html lang="pl">
	<head>
		<meta charset="UTF-8" />
		<meta
			name="viewport"
			content="width=device-width, initial-scale=1.0"
		/>
		<meta http-equiv="X-UA-Compatible" content="ie=edge" />
		<title>Sealpage example</title>
		<link
			href="/styles/style.${styleCssHash}.css"
			rel="stylesheet"
			type="text/css"
		/>
	</head>
	<body>
		${await body}
	</body>
</html>`;
