import React from 'react';
const e = React.createElement;
import { components } from '../../../components';
import FloatingLabel from '../../floating-label/floating-label';
import uuidv4 from 'uuid/v4';

function selectComponent(props) {
	const uid = uuidv4();
	return e(
		FloatingLabel,
		{
			htmlFor: `select-component#${uid}`,
		},
		e(
			'select',
			{
				id: `select-component#${uid}`,
				onChange: function onChange(e) {
					return props.onChange(e.target.value);
				},
				value: props.value,
			},
			e(
				'option',
				{
					value: '',
					disabled: true,
				},
				'+ add new component'
			),
			Object.keys(components).map(function(component) {
				return e(
					'option',
					{
						key: component,
						value: component,
					},
					component
				);
			})
		)
	);
}

export default selectComponent;
