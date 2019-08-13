const React = require('react');
const useState = React.useState;
const ElementEditor = require('./element-editor');
const Preview = require('./preview');
const SelectComponent = require('./select-component');
const ElementButtons = require('./element-buttons');
const FloatingLabel = require('../../floating-label/floating-label');

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
		<FloatingLabel type="div" label="Body">
			<div className="body-page-editor">
				<div
					style={{
						minWidth: '50%',
						height: '23rem',
						overflowY: 'auto',
					}}
				>
					{elements.map(([componentName, componentProps], index) => (
						<div
							key={index}
							style={{ display: 'flex', flexFlow: 'row wrap' }}
						>
							<ElementEditor
								componentName={componentName}
								componentProps={componentProps}
								onChange={newProps =>
									onChange(
										setElementProps(
											elements,
											index,
											newProps
										)
									)
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
				<Preview elements={elements} />
			</div>

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
		</FloatingLabel>
	);
};
