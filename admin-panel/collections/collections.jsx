import React, { useState, useEffect } from 'react';
import { Route, Link } from 'react-router-dom';
import Loading from '../loading/loading';
import useCollections from './use-collections';

function CollectionList({ match }) {
	const collection_name = match.params.collection;

	const [items, setItems] = useState([]);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		setLoading(true);
		fetch(`/api/v1/collections/${collection_name}`)
			.then(response => response.json())
			.then(response => {
				setLoading(false);
				setItems(response.items);
			});
	}, []);

	return loading ? (
		<Loading />
	) : (
		<div>
			<Link to={`/collections/${collection_name}/create`}>+create</Link>
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
	return (
		<div>
			<Route path={match.path} component={CollectionList} />
		</div>
	);
}

function Collections() {
	const collections = useCollections();
	return (
		<div>
			<nav>
				<ul>
					{collections.map(collection => (
						<li key={collection.name}>
							<Link to={`/collections/${collection.name}`}>
								{collection.name}
							</Link>
						</li>
					))}
				</ul>

				<Route path="/collections/:collection" component={Collection} />
			</nav>
		</div>
	);
}

export default Collections;
