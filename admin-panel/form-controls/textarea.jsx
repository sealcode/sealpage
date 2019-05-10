const React = require('react');

export default function textarea(props) {
	return (
		<textarea
			name={props.name}
			id={props.name}
			value={props.value}
			onChange={e => props.onChange(e.target.value)}
			required={props.required}
		/>
	);
}
