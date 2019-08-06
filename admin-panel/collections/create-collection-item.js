import React, { useState, useEffect } from 'react';

import useCollections from './use-collections.js';
import FormControls from '../form-controls/form-controls.jsx';
import Loading from '../loading/loading';

export default function({ match }) {
	const { id, collection, mode } = match.params;
	const _collection = useCollections(collection);
	const [values, setValues] = useState({});
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		async function fetchData() {
			setLoading(true);
			const query = await fetch(
				`/api/v1/collections/${collection}/${id}`
			);
			const data = await query.json();
			setValues({ ...data });
			setLoading(false);
		}
		if (mode === 'edit') {
			fetchData();
		}
	}, []);

	function setValue(key, value) {
		setValues({ ...values, [key]: value });
	}
	if (!_collection) {
		return <div>Loading...</div>;
	}

	async function save(event) {
		event.preventDefault();
		let api_endpoint = `/api/v1/collections/${collection}`;

		if (mode === 'edit') {
			api_endpoint += `/${id}`;
		}

		//Filter out unnecessary fields from values
		const body = {};
		Object.keys(values).forEach(key => {
			if (_collection.fields[key]) {
				body[key] = values[key];
			}
		});
		setLoading(true);
		const query = await fetch(api_endpoint, {
			method: mode === 'edit' ? 'PUT' : 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(body),
		});

		const response = await query.json();
		if (response.sealious_error) {
			alert(response.message);
			console.log(response);
		} else {
			alert(
				`Successfully ${mode === 'edit' ? 'edited' : 'created'} ${
					values.title
				}`
			);
			setLoading(false);
			document.location.hash = `/collections/${collection}`;
		}
	}

	return loading ? (
		<Loading />
	) : (
		<div>
			<h2>Metadata Editor</h2>
			<form onSubmit={save}>
				{JSON.stringify(values)}
				<ul>
					{Object.entries(_collection.fields).map(
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
		</div>
	);
}
