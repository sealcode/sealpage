import React from 'react';
import FloatingLabel from '../floating-label/floating-label';

function textarea(props) {
	return (
		<FloatingLabel label={props.name} type="textarea" htmlFor={props.name}>
			{React.createElement('textarea', {
				id: props.name,
				name: props.name,
				onChange: function onChange(e) {
					return props.onChange(e.target.value);
				},
				required: props.required,
				value: props.value,
			})}
		</FloatingLabel>
	);
}

export default textarea;
