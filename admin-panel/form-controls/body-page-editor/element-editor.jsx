const React = require('react');
const formControls = require('../form-controls.jsx');
const { components } = require('../../../components');

module.exports = function ElementEditor({
	componentName,
	componentProps,
	onChange,
}) {
	let propsControls = components[componentName].propsControls();

	return Object.keys(propsControls).map(prop => {
		let { control: formControlName } = propsControls[prop];
		return React.createElement(formControls[formControlName], {
			key: componentName,
			name: prop,
			value: componentProps[prop] || '',
			onChange: newValue => {
				onChange({
					...componentProps,
					[prop]: newValue,
				});
			},
			label: prop,
		});
	});
};
