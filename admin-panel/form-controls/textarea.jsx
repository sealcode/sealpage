const React = require('react');

module.exports = function textarea(props) {
	return (
		<textarea
			id={props.name}
			name={props.name}
			onChange={e => props.onChange(e.target.value)}
			required={props.required}
			value={props.value}
		/>
	);
};
