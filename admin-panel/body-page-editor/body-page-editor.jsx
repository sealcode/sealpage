import React, { Component } from 'react';
import List from './list';
import Preview from './preview';
import components_map from '../../components/components.map';

export default class BodyPageEditor extends Component {
	constructor(props) {
		super(props);

		this.state = {
			createdComponents: [],
			renderedHtml: '',
		};
		this.handleChange = this.handleChange.bind(this);
	}

	componentDidMount() {
		console.log(components_map.Markdown('# Test'));
	}

	handleChange(event) {
		this.setState({ value: event.target.value });
	}

	async renderPreview() {
		let html = '';
		for (const segment of this.state.createdComponents) {
			// TO DO: push data from segment element to function html.js
			html += await segment();
		}
		return html;
	}

	render() {
		return (
			<React.Fragment>
				<h2>Body Page Editor</h2>
				<div style={{ display: 'flex', flexFlow: 'row' }}>
					<List createdComponents={this.state.createdComponents} />
					<Preview renderedHtml={this.state.renderedHtml} />
				</div>

				<label htmlFor="select-component">Select a component: </label>

				<select id="select-component" onChange={this.handleChange}>
					<option value="">--Please choose an option--</option>
					{Object.keys(components_map).map(component => {
						return (
							<option key={component} value={component}>
								{component}
							</option>
						);
					})}
				</select>
			</React.Fragment>
		);
	}
}
