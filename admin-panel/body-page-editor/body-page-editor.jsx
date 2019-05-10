import React, { useReducer } from 'react';
import ElementEditor from './element-editor';
import Preview from './preview';
import SelectComponent from './select-component';

import components_map from '../../components/components.map';

function reducer(state, action) {
	switch (action.type) {
	case 'addElement':
		return {
			...state,
			componentToCreate: null,
			elements: state.elements.concat([
				[components_map[state.componentToCreate], {}],
			]),
		};

	case 'setElementProps':
		state.elements[action.elementIndex][1] = action.newProps;

		return {
			...state,
			elements: state.elements,
		};

	case 'setComponentToCreate':
		return {
			...state,
			componentToCreate: action.componentToCreate,
		};
	}
}
export default function bodyPageEditor() {
	const [state, dispatch] = useReducer(reducer, {
		componentToCreate: '',
		elements: [],
	});

	return (
		<React.Fragment>
			<h2>Body Page Editor</h2>
			<div style={{ display: 'flex', flexFlow: 'row' }}>
				{state.elements.map(([component, componentProps], index) => (
					<ElementEditor
						key={index}
						component={component}
						componentProps={componentProps}
						onChange={newProps =>
							dispatch({
								type: 'setElementProps',
								elementIndex: index,
								newProps,
							})
						}
					/>
				))}

				<Preview elements={state.elements} />
			</div>

			<div>{JSON.stringify(state.elements)}</div>

			<SelectComponent
				value={state.componentToCreate || ''}
				onChange={value =>
					dispatch({
						type: 'setComponentToCreate',
						componentToCreate: value,
					})
				}
			/>
			<button
				disabled={!state.componentToCreate}
				onClick={() => {
					dispatch({ type: 'addElement' });
				}}
			>
				Add element
			</button>
		</React.Fragment>
	);
}
