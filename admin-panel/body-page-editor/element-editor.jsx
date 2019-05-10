import React, { Component } from 'react';

export default function ElementEditor({ component, componentProps, onChange }) {
	function createControls() {
		let controls = [];

		for (const prop in component.propsControls) {
			controls.push(
				component.propsControls[prop]({
					name: prop,
					value: componentProps[prop],
					onChange: newValue => {
						onChange({ ...componentProps, [prop]: newValue });
					},
				})
			);
		}

		return controls;
	}

	return (
		<div
			style={{
				display: 'flex',
				flexFlow: 'column',
				width: '30rem',
				height: 'auto',
				padding: '1rem',
				margin: '1rem',
				backgroundColor: '#fdf6e3',
			}}
		>
			{createControls()}
		</div>
	);
}
