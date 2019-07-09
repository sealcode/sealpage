import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as HashRouter, Route, Link } from 'react-router-dom';

import Collections from './collections/collections.jsx';
import useCollections from './collections/use-collections.js';
import Navbar from './navbar/navbar';

import './styles.scss';

class ErrorBoundary extends React.Component {
	constructor(props) {
		super(props);
		this.state = { hasError: false, error: null };
	}

	static getDerivedStateFromError(error) {
		return { hasError: true, error: error };
	}

	componentDidCatch(error, info) {
		console.error(error, info);
	}

	render() {
		if (this.state.hasError) {
			// You can render any custom fallback UI
			return (
				<div>
					<h1>Something went wrong.</h1>
					<code>
						<pre>
							<strong>{this.state.error.message}</strong>
							{'\n'}
							{this.state.error.stack}
						</pre>
					</code>
				</div>
			);
		}

		return this.props.children;
	}
}

function AppRouter() {
	const collections = useCollections();
	return (
		<ErrorBoundary>
			<HashRouter basename="/#">
				<Navbar />
				<div>
					<Link to="/">
						<h1>Sealpage</h1>
					</Link>
					<nav>
						<ul>
							{collections.map(collection => (
								<li key={collection.name}>
									<Link
										to={`/collections/${collection.name}`}
									>
										{collection.name}
									</Link>
								</li>
							))}
						</ul>
						<Link to={'/body-page-editor'}>BodyPageEditor</Link>
					</nav>

					<hr />
					<Route
						path="/"
						exact
						component={() => <h2>Admin panel</h2>}
					/>
					<Route path="/collections" component={Collections} />

					{/* it's only for mockup testing  */}
					{/* <Route path="/body-page-editor" component={BodyPageEditor} /> */}
				</div>
			</HashRouter>
		</ErrorBoundary>
	);
}

ReactDOM.render(React.createElement(AppRouter), document.getElementById('app'));
