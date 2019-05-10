import React from 'react';

export default function date(props) {
	return (
		<input
			id={props.name}
			name={props.name}
			onChange={e => props.onChange(e.target.value)}
			required={props.required}
			type="date"
			value={props.value}
		/>
	);
}
