const React = require('react');
const { useState, useEffect } = React;
const uuidv4 = require('uuid/v4');

async function generateRenderedHTML(uuid, elements) {
	return await fetch('/api/v1/render', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ uuid, body: elements }),
	}).then(response => response.text());
}

module.exports = function Preview({ elements }) {
	const [previewUrl, setPreviewUrl] = useState('');
	const [uuid] = useState(uuidv4());

	useEffect(() => {
		generateRenderedHTML(uuid, elements).then(url => setPreviewUrl(url));
	}, [JSON.stringify(elements)]);

	return (
		<iframe
			src={previewUrl}
			style={{
				backgroundColor: '#f1f1f1',
				display: 'flex',
				flexFlow: 'column',
				height: 'auto',
				margin: '1rem',
				padding: '1rem',
				width: '30rem',
			}}
		/>
	);
};
