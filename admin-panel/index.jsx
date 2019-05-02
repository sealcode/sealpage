import 'babel-polyfill';
import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as HashRouter, Route, Link } from 'react-router-dom';

import useCollections from './collections/use-collections.js';
import Collections from './collections/collections.jsx';

const Index = () => <h1>Admin panel</h1>;

function AppRouter() {
	const collections = useCollections();
	return (
		<HashRouter basename="/#">
			<div>
				<Link to="/">
					<h1>Admin panel</h1>
				</Link>
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
				</nav>
				<Route path="/" exact component={Index} />
				<Route path="/collections" component={Collections} />
			</div>
		</HashRouter>
	);
}

ReactDOM.render(React.createElement(AppRouter), document.getElementById('app'));
