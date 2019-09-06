import React from 'react';

function FloatingLabel(props) {
	return (
		<div
			className={`floating-label floating-label--${props.type ||
				'input'}`}
		>
			<label
				htmlFor={props.htmlFor}
				className={`floating-label__label floating-label__label--${props.type ||
					'input'}`}
			>
				{props.label}
			</label>
			{props.children}
		</div>
	);
}

export default FloatingLabel;
