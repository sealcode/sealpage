const React = require('react');
const formControls = require('./../form-controls/form-controls.jsx');
const components_map = require('../../components');

module.exports = function ElementEditor({
	componentName,
	componentProps,
	onChange,
}) {
	function createControls() {
		let controls = [];

		for (const prop in components_map[componentName].propsControls) {
			let formControlName =
				components_map[componentName].propsControls[prop];

			controls.push(
				formControls[formControlName]({
					name: prop,
					key: prop,
					value: componentProps[prop] || '',
					onChange: newValue => {
						onChange({ ...componentProps, [prop]: newValue });
					},
				})
			);
		}

		return controls;
	}

	return React.createElement(
		'div',
		{
			style: {
				backgroundColor: '#fdf6e3',
				display: 'flex',
				flexFlow: 'column',
				height: 'auto',
				margin: '1rem',
				padding: '1rem',
				width: '30rem',
			},
		},
		createControls()
	);
};
