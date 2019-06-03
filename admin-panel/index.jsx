import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as HashRouter, Route, Link } from 'react-router-dom';

import Collections from './collections/collections.jsx';
import useCollections from './collections/use-collections.js';

import './remedy.css';
import './index.scss';

function AppRouter() {
	const collections = useCollections();

	return (
		<HashRouter basename="/#">
			<header className="header">
				<Link to="/">
					<div className="sealpage-logo" />
				</Link>
				Sealpage
			</header>

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

			<hr />
			<Route path="/" exact component={() => <h2>Admin panel</h2>} />
			<Route path="/collections" component={Collections} />
		</HashRouter>
	);
}

ReactDOM.render(React.createElement(AppRouter), document.getElementById('app'));
