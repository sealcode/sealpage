import React, { useState } from 'react';
import Preview from './preview';
import FloatingLabel from '../../floating-label/floating-label';
import ComponentList from './component-list';
import Controls from './controls';

export default function bodyPageEditor({ value: elements, onChange }) {
	if (elements === '') elements = [];
	const [isZenMode, setZenMode] = useState(false);

	return (
		<FloatingLabel isZenMode={isZenMode} type="div" label="Body">
			<div className="body-page-editor">
				<ComponentList elements={elements} onChange={onChange} />
				<Preview elements={elements} />
				<Controls {...{ isZenMode, setZenMode, elements, onChange }} />
			</div>
		</FloatingLabel>
	);
}
