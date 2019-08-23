const React = require('react');
const useState = React.useState;

const Preview = require('./preview');
const ComponentList = require('./component-list');
const Controls = require('./controls');

const FloatingLabel = require('../../floating-label/floating-label');

module.exports = function bodyPageEditor({ value: elements, onChange }) {
	if (elements === '') elements = [];
	const [isZenMode, setZenMode] = useState(false);

	return (
		<FloatingLabel
			className={isZenMode ? 'zen-mode' : ''}
			type="div"
			label="Body"
		>
			<div className="body-page-editor">
				<ComponentList elements={elements} onChange={onChange} />
				<Preview elements={elements} />
				<Controls
					isZenMode={isZenMode}
					setZenMode={setZenMode}
					elements={elements}
					onChange={onChange}
				/>
			</div>
		</FloatingLabel>
	);
};
