// const React = require('react');
// const SelectComponent = require('./select-component');
// const Button = require('../../button/button').default;

import React from 'react';
import SelectComponent from './select-component';
import Button from '../../button/button';

function addElement(elements, componentToCreate) {
	return elements.concat([[componentToCreate, {}]]);
}

export default function Controls({
	isZenMode,
	setZenMode,
	elements,
	onChange,
}) {
	return (
		<div className="body-page-editor__control-group">
			<div className="body-page-editor__control-group--left">
				<SelectComponent
					value=""
					onChange={e => onChange(addElement(elements, e))}
				/>
				<Button
					onClick={e => {
						e.preventDefault();
						window.scrollTo(0, 0);
						setZenMode(!isZenMode);
					}}
					icon="&#xe03f;"
					modifier="secondary"
				>
					{isZenMode ? 'Turn off zen mode' : 'Zen mode'}
				</Button>
			</div>
			<div className="body-page-editor__control-group--right">
				<Button onClick={e => e.preventDefault()} icon="(">
					editor
				</Button>
				<Button onClick={e => e.preventDefault()} icon="&#xe037;">
					preview
				</Button>
			</div>
		</div>
	);
}
