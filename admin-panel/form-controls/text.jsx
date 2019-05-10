import React from 'react';

export default function text(props) {
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
}
