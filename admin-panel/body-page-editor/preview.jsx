import React, { Component } from 'react';

export default function Preview(props) {
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
			dangerouslySetInnerHTML={{ __html: props.renderedHtml }}
		/>
	);
}
