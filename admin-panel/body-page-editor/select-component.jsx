const React = require('react');
const components_map = require('../../components/components.map.js');

module.exports = function selectComponent(props) {
	return React.createElement(
		'select',
		{
			id: 'select-component',
			onChange: function onChange(e) {
				return props.onChange(e.target.value);
			},
			value: props.value,
		},
		React.createElement(
			'option',
			{
				value: '',
			},
			'--Please choose an option--'
		),
		Object.keys(components_map).map(function(component) {
			return React.createElement(
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
