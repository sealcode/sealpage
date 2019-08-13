import React, { useState, useEffect } from 'react';
import capitalize from '../../utils/capitalize';

import useCollections from './use-collections.js';
import FormControls from '../form-controls/form-controls.jsx';
import Loading from '../loading/loading';
import Button from '../button/button';

function renderFieldGroup(fields, values, setValue) {
	return fields.map(([field_name, field]) =>
		FormControls[field.type.name]
			? /* eslint-disable indent */
			  React.createElement(FormControls[field.type.name], {
					key: field_name,
					...field,
					onChange: value => setValue(field_name, value),
					value: values[field_name] || '',
					label: field_name,
			  })
			: /* eslint-enable indent */
			  `: ${field.type.name}`
	);
}

function CreateCollectionItem({ match }) {
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

	const fields_by_group = {};
	const collection_fields = Object.entries(_collection.fields);

	for (const [field_name, field] of collection_fields) {
		const group = field.display_hints.group;
		const element = [field_name, field];

		fields_by_group[group] = [element, ...(fields_by_group[group] || [])];
	}

	return loading ? (
		<Loading />
	) : (
		<div style={{ width: '100%' }}>
			<h1 className="create-form__title">
				{capitalize(mode)} an item for the{' '}
				<span className="create-form__collection-name">
					{capitalize(collection)}
				</span>{' '}
				collection
			</h1>
			<form className="create-form" onSubmit={save}>
				{Object.keys(fields_by_group).map((group, index) => (
					<React.Fragment key={`group#${index}`}>
						<h2 className="create-form__header">
							{capitalize(group)}
						</h2>
						<Button
							onClick={e => e.preventDefault()}
							icon="W"
							modifier="secondary"
							style={{ float: 'right' }}
						>
							Collapse
						</Button>
						<ul
							className={`create-form__group create-form__group--${group}`}
						>
							{renderFieldGroup(
								fields_by_group[group],
								values,
								setValue
							)}
						</ul>
					</React.Fragment>
				))}
				<div className="create-form__btn-group">
					<Button
						onClick={e => e.preventDefault()}
						modifier="secondary"
						icon="K"
					>
						Full preview
					</Button>
					<Button
						style={{ marginLeft: '0.5rem' }}
						icon="S"
						type="submit"
					>
						Save
					</Button>
				</div>
			</form>
		</div>
	);
}

export default CreateCollectionItem;
