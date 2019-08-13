const React = require('react');
const e = React.createElement;
const { components } = require('../../../components');
const FloatingLabel = require('../../floating-label/floating-label');

function selectComponent(props) {
	const uid = require('uuid/v4')();
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

module.exports = selectComponent;
