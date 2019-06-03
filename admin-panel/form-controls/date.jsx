const React = require('react');

module.exports = function date(props) {
	return React.createElement('input', {
		className: props.className,
		placeholder: props.placeholder,
		id: props.name,
		name: props.name,
		onChange: function onChange(e) {
			return props.onChange(e.target.value);
		},
		required: props.required,
		type: 'date',
		value: props.value,
	});
};
