const React = require('react');
const useState = React.useState;
const ElementEditor = require('./element-editor.jsx');
const Preview = require('./preview.jsx');
const SelectComponent = require('./select-component.jsx');

import './body-page-editor.scss';

function addElement(elements, componentToCreate) {
	return elements.concat([[componentToCreate, {}]]);
}

function removeElement(elements, index) {
	elements.splice(index, 1);
	return [...elements];
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

function minmax(min, max, value) {
	return Math.min(Math.max(value, min), max);
}

module.exports = function bodyPageEditor({ value: elements, onChange }) {
	const [componentToCreate, setComponentToCreate] = useState(null);

	if (elements === '') elements = [];

	return (
		<div className="editor">
			{elements.map(([componentName, componentProps], index) => (
				<div className="container" key={index}>
					<ElementEditor
						componentName={componentName}
						componentProps={componentProps}
						onChange={newProps =>
							onChange(setElementProps(elements, index, newProps))
						}
					/>
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
							onChange(
								changeElementPosition(elements, index, -1)
							);
						}}
					>
						Move up ↑
					</button>
					<button
						onClick={e => {
							e.preventDefault();
							onChange(changeElementPosition(elements, index, 1));
						}}
						dasdsadasdasda
					>
						Move down ↓
					</button>
				</div>
			))}

			<Preview elements={elements} />

			<div>{JSON.stringify(elements)}</div>

			<SelectComponent
				value={componentToCreate || ''}
				onChange={setComponentToCreate}
			/>
			<button
				disabled={!componentToCreate}
				onClick={e => {
					e.preventDefault();
					onChange(addElement(elements, componentToCreate));
				}}
			>
				Add element
			</button>
		</div>
	);
};
