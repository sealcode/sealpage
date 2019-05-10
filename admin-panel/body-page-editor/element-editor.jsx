import React from 'react';

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
				backgroundColor: '#fdf6e3',
				display: 'flex',
				flexFlow: 'column',
				height: 'auto',
				margin: '1rem',
				padding: '1rem',
				width: '30rem',
			}}
		>
			{createControls()}
		</div>
	);
}
