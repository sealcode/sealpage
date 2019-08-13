const React = require('react');
const ElementEditor = require('./element-editor');
const Preview = require('./preview');
const SelectComponent = require('./select-component');
const ElementButtons = require('./element-buttons');
const FloatingLabel = require('../../floating-label/floating-label');
const Button = require('../../button/button').default;

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
			<div className="body-page-editor__control-group">
				<div className="body-page-editor__control-section">
					<SelectComponent
						value=""
						onChange={e => {
							onChange(addElement(elements, e));
						}}
					/>
					<Button
						onClick={e => e.preventDefault()}
						icon="&#xe03f;"
						modifier="secondary"
					>
						zen mode
					</Button>
				</div>
				<div className="body-page-editor__control-section">
					<Button onClick={e => e.preventDefault()} icon="(">
						editor
					</Button>
					<Button onClick={e => e.preventDefault()} icon="&#xe037;">
						preview
					</Button>
				</div>
			</div>
		</FloatingLabel>
	);
};
