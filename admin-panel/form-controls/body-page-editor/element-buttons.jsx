import React from 'react';

function elementButtons({ elements, index, handlers }) {
	const [changeElementPosition, removeElement, onChange] = handlers;
	return (
		<div className="component__controls">
			<button
				onClick={e => {
					e.preventDefault();
					onChange(removeElement(elements, index));
				}}
			>
				🗑️
			</button>
			<button
				onClick={e => {
					e.preventDefault();
					onChange(changeElementPosition(elements, index, -1));
				}}
			>
				↑
			</button>
			<button
				onClick={e => {
					e.preventDefault();
					onChange(changeElementPosition(elements, index, 1));
				}}
			>
				↓
			</button>
		</div>
	);
}

export default elementButtons;
