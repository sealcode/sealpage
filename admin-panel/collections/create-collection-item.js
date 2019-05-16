import React, { useState } from 'react';

import useCollections from './use-collections.js';
import FormControls from '../form-controls/form-controls.jsx';

export default function({ match }) {
	const collection_name = match.params.collection;
	const collection = useCollections(collection_name);

	const [values, setValues] = useState({});
	const [inputErrors, setInputErrors] = useState({});

	function setValue(key, value) {
		setValues({ ...values, [key]: value });
	}
	if (!collection) {
		return <div>Loading...</div>;
	}

	function save(e) {
		e.preventDefault();
		fetch(`/api/v1/collections/${collection_name}`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ ...values, body: [{}] }),
		})
			.then(response => response.json())
			.then(
				() =>
					(document.location.hash = `/collections/${collection_name}`)
			);
	}

	return (
		<div>
			<h2>Metadata Editor</h2>
			<form onSubmit={save}>
				{JSON.stringify(values)}
				<ul>
					{Object.entries(collection.fields).map(
						([field_name, field]) => (
							<label
								htmlFor={field_name}
								style={{ display: 'block' }}
								key={field_name}
							>
								{field_name}
								{FormControls[field.type.name]
									? /* eslint-disable indent */
									  React.createElement(
											FormControls[field.type.name],
											{
												...field,
												onChange: value =>
													setValue(field_name, value),
												value: values[field_name] || '',
											}
									  )
									: /* eslint-enable indent */
									  `: ${field.type.name}`}
							</label>
						)
					)}
				</ul>
				<input type="submit" />
			</form>
			{/* <h2>Body Page Editor</h2>
			<BodyPageEditor
				onChange={value => setValue('body', value)} // array-of-objects
				value={values['body']}
			/> */}
		</div>
	);
}
