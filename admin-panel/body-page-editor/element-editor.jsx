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

		let propsControls = components_map[componentName].propsControls();

		for (const prop in propsControls) {
			let formControlName = propsControls[prop];

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
