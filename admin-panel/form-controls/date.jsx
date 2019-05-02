const React = require('react');

export default function date(props) {
	return (
		<input
			type="date"
			name={props.name}
			value={props.value}
			id={props.name}
			onChange={e => props.onChange(e.target.value)}
			required={props.required}
		/>
	);
}
