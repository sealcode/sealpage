const { useEffect, useState } = require('react');

let collections_cache = [];
let promise = null;
let loaded = false;

const url = 'http://localhost:8080/api/v1/specifications';

export default function useCollections(collection_name) {
	const [collections, setCollections] = useState(collections_cache);
	if (promise) {
		promise.then(setCollections);
	} else {
		if (loaded) {
			setCollections(collections_cache);
		} else {
			promise = (async function() {
				const response = await fetch(url);
				const collections = (await response.json()).filter(
					collection =>
						![
							'user-roles',
							'users',
							'sessions',
							'anonymous-sessions',
							'formatted-images',
							'password-reset-intents',
							'registration-intents',
						].includes(collection.name)
				);
				setCollections(collections);
				collections_cache = collections;
				loaded = true;
				return collections;
			})();
		}
	}
	return collection_name
		? collections.filter(
				collection => collection.name == collection_name
		  )[0]
		: collections;
}
