const React = require('react');

module.exports = function ElementEditor({
	component,
	componentProps,
	onChange,
}) {
	function createControls() {
		let controls = [];

		for (const prop in component.propsControls) {
			console.log(
				component.propsControls,
				prop,
				component.propsControls[prop]
			);

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
