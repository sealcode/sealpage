const React = require('react');
const useReducer = React.useReducer;
const ElementEditor = require('./element-editor.jsx');
const Preview = require('./preview.jsx');
const SelectComponent = require('./select-component.jsx');

const components_map = require('../../components/components.map');

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
module.exports = function bodyPageEditor() {
	const [state, dispatch] = useReducer(reducer, {
		componentToCreate: '',
		elements: [],
	});

	function _slicedToArray(arr, i) {
		return (
			_arrayWithHoles(arr) ||
			_iterableToArrayLimit(arr, i) ||
			_nonIterableRest()
		);
	}

	function _nonIterableRest() {
		throw new TypeError(
			'Invalid attempt to destructure non-iterable instance'
		);
	}

	function _iterableToArrayLimit(arr, i) {
		var _arr = [];
		var _n = true;
		var _d = false;
		var _e = undefined;
		try {
			for (
				var _i = arr[Symbol.iterator](), _s;
				!(_n = (_s = _i.next()).done);
				_n = true
			) {
				_arr.push(_s.value);
				if (i && _arr.length === i) break;
			}
		} catch (err) {
			_d = true;
			_e = err;
		} finally {
			try {
				if (!_n && _i['return'] != null) _i['return']();
			} finally {
				if (_d) throw _e;
			}
		}
		return _arr;
	}

	function _arrayWithHoles(arr) {
		if (Array.isArray(arr)) return arr;
	}

	return React.createElement(
		'div',
		null,
		React.createElement(
			'div',
			{
				style: {
					display: 'flex',
					flexFlow: 'column',
				},
			},
			state.elements.map(function(_ref, index) {
				var _ref2 = _slicedToArray(_ref, 2),
					component = _ref2[0],
					componentProps = _ref2[1];

				return React.createElement(ElementEditor, {
					key: index,
					component: component,
					componentProps: componentProps,
					onChange: function onChange(newProps) {
						return dispatch({
							type: 'setElementProps',
							elementIndex: index,
							newProps: newProps,
						});
					},
				});
			}),
			React.createElement(Preview, {
				elements: state.elements,
			})
		),
		React.createElement('div', null, JSON.stringify(state.elements)),
		React.createElement(SelectComponent, {
			value: state.componentToCreate || '',
			onChange: function onChange(value) {
				return dispatch({
					type: 'setComponentToCreate',
					componentToCreate: value,
				});
			},
		}),
		React.createElement(
			'button',
			{
				disabled: !state.componentToCreate,
				onClick: function onClick() {
					dispatch({
						type: 'addElement',
					});
				},
			},
			'Add element'
		)
	);

	// retrun <React.Fragment>
	// 	<div style={{ display: 'flex', flexFlow: 'column' }}>
	// 		{state.elements.map(([component, componentProps], index) => (
	// 			<ElementEditor
	// 				key={index}
	// 				component={component}
	// 				componentProps={componentProps}
	// 				onChange={newProps =>
	// 					dispatch({
	// 						type: 'setElementProps',
	// 						elementIndex: index,
	// 						newProps,
	// 					})
	// 				}
	// 			/>
	// 		))}

	// 		<Preview elements={state.elements} />
	// 	</div>

	// 	<div>{JSON.stringify(state.elements)}</div>

	// 	<SelectComponent
	// 		value={state.componentToCreate || ''}
	// 		onChange={value =>
	// 			dispatch({
	// 				type: 'setComponentToCreate',
	// 				componentToCreate: value,
	// 			})
	// 		}
	// 	/>
	// 	<button
	// 		disabled={!state.componentToCreate}
	// 		onClick={() => {
	// 			dispatch({ type: 'addElement' });
	// 		}}
	// 	>
	// 		Add element
	// 	</button>
	// </React.Fragment>
};
