const React = require('react');
const { useEffect, useState } = React;
import { BrowserRouter as HashRouter, Route, Link } from 'react-router-dom';
import useCollections from './use-collections.js';
import CreateCollectionItem from './create-collection-item.js';

function CollectionList({ match }) {
	const collection_name = match.params.collection;
	const collection = useCollections(collection_name);

	const [items, setItems] = useState([]);

	useEffect(() => {
		fetch(`/api/v1/collections/${collection_name}`)
			.then(response => response.json())
			.then(response => setItems(response.items));
	}, []);

	return (
		<div>
			<Link to={`/collections/${collection_name}/create`}>
				Create new item in collection
			</Link>

			<h3>Items: </h3>
			{items.map((item, index) => (
				<React.Fragment key={index}>
					<div>{item.title}</div>
					<Link
						to={`/collections/${collection_name}/edit/${item.id}`}
					>
						edit
					</Link>
				</React.Fragment>
			))}
		</div>
	);
}

function Collection({ match }) {
	const collection_name = match.params.collection;

	return (
		<div>
			<h3>Selected collection: {collection_name}</h3>
			<Route exact path={match.path} component={CollectionList} />
		</div>
	);
}

function Collections({ match }) {
	return (
		<div>
			<h2>Collections</h2>
			<Route path={`${match.path}/:collection`} component={Collection} />
			<Route
				exact
				path={`${match.path}/:collection/:mode`}
				component={CreateCollectionItem}
			/>
			<Route
				exact
				path={`${match.path}/:collection/:mode/:id`}
				component={CreateCollectionItem}
			/>
			<Route
				exact
				path={match.path}
				component={() => <div>Pick a collection</div>}
			/>
		</div>
	);
}

export default Collections;
