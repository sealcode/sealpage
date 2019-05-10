import React, { useState, useEffect } from 'react';

async function renderPreview(elements) {
	let html = '';

	for (const [component, componentProps] of elements) {
		html += await component.render(componentProps);
	}

	return html;
}
export default function Preview(props) {
	const [html, setHtml] = useState('');

	useEffect(() => {
		renderPreview(props.elements).then(setHtml);
	});

	return (
		<div
			style={{
				backgroundColor: '#f1f1f1',
				display: 'flex',
				flexFlow: 'column',
				height: 'auto',
				margin: '1rem',
				padding: '1rem',
				width: '30rem',
			}}
			dangerouslySetInnerHTML={{ __html: html }}
		/>
	);
}
