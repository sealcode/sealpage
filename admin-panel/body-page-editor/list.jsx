import React, { Component } from 'react';

export default class List extends Component {
	render() {
		return (
			<div
				style={{
					display: 'flex',
					flexFlow: 'column',
					width: '30rem',
					height: 'auto',
					padding: '1rem',
					margin: '1rem',
					backgroundColor: '#fdf6e3',
				}}
			>
				Body content
			</div>
		);
	}
}
