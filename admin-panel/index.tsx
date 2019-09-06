import 'babel-polyfill';
import React, { ErrorInfo, ReactNode, ReactElement, Component } from 'react';

import ReactDOM from 'react-dom';
import { BrowserRouter as HashRouter, Route } from 'react-router-dom';
import Collections from './collections/collections';
import CreateCollectionItem from './collections/create-collection-item';

import Navbar from './navbar/navbar';
import Sidebar from './sidebar/sidebar';

import './styles.scss';

interface State {
	hasError: boolean;
	error: Error | null;
}

interface Props {
	children: ReactNode;
}

class ErrorBoundary extends Component<Props, State> {
	constructor(props: Props) {
		super(props);
		this.state = { hasError: false, error: null };
	}

	static getDerivedStateFromError(error: Error): object {
		return { hasError: true, error };
	}

	componentDidCatch(error: Error, info: ErrorInfo): void {
		console.error(error, info);
	}

	render(): ReactNode {
		const { hasError, error } = this.state;
		if (hasError) {
			// You can render any custom fallback UI
			return (
				<div>
					<h1>Something went wrong.</h1>
					<code>
						<pre>
							<strong>{(error as Error).message}</strong>
							{'\n'}
							{(error as Error).stack}
						</pre>
					</code>
				</div>
			);
		}

		return this.props.children;
	}
}

const AppRouter = (): ReactElement => {
	return (
		<ErrorBoundary>
			<HashRouter basename="/#">
				<Navbar />
				<div className="app-sealpage">
					<Sidebar />
					<Route exact path="/collections" component={Collections} />
					<Route
						exact
						path="/collections/:collection"
						component={Collections}
					/>
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
};

ReactDOM.render(React.createElement(AppRouter), document.getElementById('app'));
