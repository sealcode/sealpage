import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as HashRouter, Link, Route } from 'react-router-dom';
import Collections from './collections/collections';
import CreateCollectionItem from './collections/create-collection-item';

import Navbar from './navbar/navbar';
import Sidebar from './sidebar/sidebar';

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
	return (
		<ErrorBoundary>
			<HashRouter basename="/#">
				<Navbar />
				<div className="app-sealpage">
					<Sidebar />
					<Route exact path="/collections" component={Collections} />
					<Route exact path="/collections/:collection" component={Collections} />
					<Route
						exact
						path="/collections/:collection/:mode"
						component={CreateCollectionItem}
					/>
					<Route
						exact
						path="/collections/:collection/:mode/:id"
						component={CreateCollectionItem}
					/>

					{/* it's only for mockup testing  */}
					{/* <Route path="/body-page-editor" component={BodyPageEditor} /> */}
					<div
						style={{
							display: 'flex',
							justifyContent: 'space-between',
							flexWrap: 'wrap',
						}}
					/>
				</div>
			</HashRouter>
		</ErrorBoundary>
	);
}

ReactDOM.render(React.createElement(AppRouter), document.getElementById('app'));
