import React from 'react';

function elementButtons({ elements, index, handlers }) {
	const [changeElementPosition, removeElement, onChange] = handlers;
	return (
		<>
			<button
				onClick={e => {
					e.preventDefault();
					onChange(removeElement(elements, index));
				}}
			>
				Remove element
			</button>
			<button
				onClick={e => {
					e.preventDefault();
					onChange(changeElementPosition(elements, index, -1));
				}}
			>
				Move up ↑
			</button>
			<button
				onClick={e => {
					e.preventDefault();
					onChange(changeElementPosition(elements, index, 1));
				}}
			>
				Move down ↓
			</button>
		</>
	);
}

export default elementButtons;
