const React = require('react');

module.exports = function text(props) {
	return React.createElement('input', {
		id: props.name,
		name: props.name,
		onChange: function onChange(e) {
			return props.onChange(e.target.value);
		},
		required: props.required,
		type: 'text',
		value: props.value,
	});
};
