import React from 'react';
import formControls from '../form-controls';
import { components } from '../../../components';

export default function ElementEditor({
	componentName,
	componentProps,
	onChange,
}) {
	const propsControls = components[componentName].propsControls();

	return Object.keys(propsControls).map(prop => {
		const { control: formControlName } = propsControls[prop];
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
}
