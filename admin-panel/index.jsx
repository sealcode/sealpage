import 'babel-polyfill';
import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as HashRouter, Route, Link } from 'react-router-dom';

const url = 'http://localhost:8080/api/v1/specifications';

const Index = () => <h1>Admin panel</h1>;

function AppRouter() {
	const [collections, setCollections] = useState([]);

	useEffect(() => {
		(async function() {
			const response = await fetch(url, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
				},
			});
			setCollections(await response.json());
		})();
	}, []);

	return (
		<HashRouter basename="/#">
			<div>
				<nav>
					<ul>
						{collections.map(collection => (
							<li key={collection.name}>
								<Link to={`/collection/${collection.name}`}>
									{collection.name}
								</Link>
							</li>
						))}

						<li>
							<Link to="/">Home</Link>
						</li>
						<li>
							<Link to="/about/">About</Link>
						</li>
					</ul>
				</nav>

				<Route path="/" exact component={Index} />
			</div>
		</HashRouter>
	);
}

console.log(document.getElementById('app'));

ReactDOM.render(React.createElement(AppRouter), document.getElementById('app'));
