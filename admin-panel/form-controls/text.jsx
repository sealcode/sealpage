const React = require('react');

module.exports = function text(props) {
	return (
		<input
			id={props.name}
			name={props.name}
			onChange={e => props.onChange(e.target.value)}
			required={props.required}
			type="text"
			value={props.value}
		/>
	);
};
