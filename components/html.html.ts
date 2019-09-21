import hashFile from '../lib/hash-file';
import navbar from './navbar/navbar.html';

const styleCssHash = hashFile('public/styles/style.css');

export default async ({ title, class_name }, body) => /* HTML */ `
	<!DOCTYPE html>
	<html lang="pl">
		<head>
			<meta charset="UTF-8" />
			<meta
				name="viewport"
				content="width=device-width, initial-scale=1.0"
			/>
			<meta http-equiv="X-UA-Compatible" content="ie=edge" />
			<title>${title ? title + ' | ' : ''}Sealcode</title>
			<link
				href="/styles/style.${styleCssHash}.css"
				rel="stylesheet"
				type="text/css"
			/>
		</head>
		<body class="${class_name}">
			${await navbar()} ${await body}
		</body>
	</html>
`;
