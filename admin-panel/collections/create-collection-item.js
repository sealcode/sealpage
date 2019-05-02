const React = require('react');
const { useEffect, useState } = React;
import { BrowserRouter as HashRouter, Route, Link } from 'react-router-dom';
import useCollections from './use-collections.js';
import FormControls from '../form-controls/form-controls.jsx';

export default function({ match }) {
	const collection_name = match.params.collection;
	const collection = useCollections(collection_name);
	if (!collection) {
		return <div>Loading...</div>;
	}
	return (
		<form>
			<ul>
				{Object.entries(collection.fields).map(
					([field_name, field]) => (
						<li>
							{field_name}, {field.type.name}
							{FormControls[field.type.name]
								? React.createElement(
										FormControls[field.type.name]
								  )
								: null}
						</li>
					)
				)}
			</ul>
		</form>
	);
}
