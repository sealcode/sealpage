const React = require('react');

module.exports = function textarea(props) {
	return React.createElement('textarea', {
		className: props.className,
		placeholder: props.placeholder,
		id: props.name,
		name: props.name,
		onChange: function onChange(e) {
			return props.onChange(e.target.value);
		},
		required: props.required,
		value: props.value,
	});
};
