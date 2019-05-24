const React = require('react');
const { useState, useEffect } = React;

async function generateRenderedHTML(elements) {
	return await fetch('/api/v1/render', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ body: elements }),
	}).then(response => response.text());
}

module.exports = function Preview({ elements }) {
	const [html, setHtml] = useState('');

	useEffect(() => {
		generateRenderedHTML(elements).then(data => setHtml(data));
	}, [elements]);

	return React.createElement('div', {
		style: {
			backgroundColor: '#f1f1f1',
			display: 'flex',
			flexFlow: 'column',
			height: 'auto',
			margin: '1rem',
			padding: '1rem',
			width: '30rem',
		},
		dangerouslySetInnerHTML: {
			__html: html,
		},
	});
};
