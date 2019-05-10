import React from 'react';

export default function textarea(props) {
	return (
		<textarea
			id={props.name}
			name={props.name}
			onChange={e => props.onChange(e.target.value)}
			required={props.required}
			value={props.value}
		/>
	);
}
