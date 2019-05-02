const React = require('react');

export default function text(props) {
	return (
		<input
			type="text"
			name={props.name}
			id={props.name}
			value={props.value}
			onChange={e => props.onChange(e.target.value)}
			required={props.required}
		/>
	);
}
