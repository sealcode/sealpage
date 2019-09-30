import React from 'react';
import ElementEditor from './element-editor';
import ElementButtons from './element-buttons';

function removeElement(elements, index) {
	elements.splice(index, 1);
	return [...elements];
}

function minmax(min, max, value) {
	return Math.min(Math.max(value, min), max);
}

function changeElementPosition(elements, index, offset) {
	elements.splice(
		minmax(0, elements.length, index + offset),
		0,
		elements.splice(index, 1)[0]
	);

	return [...elements];
}

function setElementProps(elements, index, newProps) {
	elements[index][1] = newProps;
	return [...elements];
}

export default function ComponentList({ elements, onChange }) {
	return (
		<div className="body-page-editor__components-list">
			{elements.map(([componentName, componentProps], index) => (
				<div className="component" key={index}>
					<ElementEditor
						componentName={componentName}
						componentProps={componentProps}
						onChange={newProps =>
							onChange(setElementProps(elements, index, newProps))
						}
					/>
					<ElementButtons
						elements={elements}
						index={index}
						handlers={[
							changeElementPosition,
							removeElement,
							onChange,
						]}
					/>
				</div>
			))}
		</div>
	);
}
