const React = require('react');

const e = React.createElement;
const components_map = require('../../components/index.js');

module.exports = function selectComponent(props) {
	return e(
		'select',
		{
			id: 'select-component',
			onChange: function onChange(e) {
				return props.onChange(e.target.value);
			},
			value: props.value,
		},
		e(
			'option',
			{
				value: '',
			},
			'--Please choose an option--'
		),
		Object.keys(components_map).map(function(component) {
			return e(
				'option',
				{
					key: component,
					value: component,
				},
				component
			);
		})
	);
};
