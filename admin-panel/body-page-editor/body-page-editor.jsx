const React = require('react');
const useState = React.useState;
const ElementEditor = require('./element-editor.jsx');
const Preview = require('./preview.jsx');
const SelectComponent = require('./select-component.jsx');

function addElement(elements, componentToCreate, onChange) {
	onChange(elements.concat([[componentToCreate, {}]]));
}

function removeElement(elements, index, onChange) {
	elements.splice(index, 1);
	onChange([...elements]);
}

function setElementProps(elements, index, newProps, onChange) {
	elements[index][1] = newProps;
	onChange([...elements]);
}

module.exports = function bodyPageEditor({ value: elements, onChange }) {
	const [componentToCreate, setComponentToCreate] = useState(null);

	if (elements === '') elements = [];

	return (
		<React.Fragment>
			<div style={{ display: 'flex', flexFlow: 'column' }}>
				{elements.map(([componentName, componentProps], index) => (
					<div
						key={index}
						style={{ display: 'flex', flexFlow: 'row' }}
					>
						<ElementEditor
							componentName={componentName}
							componentProps={componentProps}
							onChange={newProps =>
								setElementProps(
									elements,
									index,
									newProps,
									onChange
								)
							}
						/>
						<button
							onClick={() => {
								removeElement(elements, index, onChange);
							}}
						>
							Remove element
						</button>
					</div>
				))}

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
					addElement(elements, componentToCreate, onChange);
				}}
			>
				Add element
			</button>
		</React.Fragment>
	);
};
