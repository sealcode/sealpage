import React from 'react';

//Each icon has an associated symbol to provide in the data-icon prop
//Reference: http://demo.amitjakhu.com/dripicons/

function Button(props) {
	return React.createElement(
		'button',
		{
			className: `button button--${props.modifier || 'primary'}`,
			...props,
		},
		[
			props.icon
				? React.createElement('div', {
					className: `button__icon button__icon--${props.icon}`,
					'data-icon': props.icon,
					key: 'buttonicon',
				  })
				: null,
			props.children,
		]
	);
}

export default Button;
