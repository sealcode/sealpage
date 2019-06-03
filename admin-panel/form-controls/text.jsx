const React = require('react');

module.exports = function text(props) {
	return React.createElement('input', {
		className: props.className,
		placeholder: props.placeholder,
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
