const React = require('react');
const FloatingLabel = require('../floating-label/floating-label');

function text(props) {
	return (
		<FloatingLabel label={props.name} htmlFor={props.name}>
			{React.createElement('input', {
				id: props.name,
				name: props.name,
				onChange: function onChange(e) {
					return props.onChange(e.target.value);
				},
				required: props.required,
				type: 'text',
				value: props.value,
			})}
		</FloatingLabel>
	);
}

module.exports = text;
