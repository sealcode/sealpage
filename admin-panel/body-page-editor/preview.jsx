import React, { Component, useState, useEffect } from 'react';

async function renderPreview(elements) {
	let html = '';
	console.log('elements', elements);

	for (const [component, componentProps] of elements) {
		console.log(component, componentProps);

		html += await component.render(componentProps);
	}
	console.log(html);
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
				display: 'flex',
				flexFlow: 'column',
				width: '30rem',
				height: 'auto',
				padding: '1rem',
				margin: '1rem',
				backgroundColor: '#f1f1f1',
			}}
			dangerouslySetInnerHTML={{ __html: html }}
		/>
	);
}
