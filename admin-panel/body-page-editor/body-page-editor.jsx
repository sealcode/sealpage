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
			value: '',
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

	createComponentForm() {
		let form = [];
		console.log('create component form');

		for (let i = 0; i < components_map[this.state.value].length; i++) {
			// TO DO: we have to consider using typescript for components or documented code of parameters to sealpage components
			form.push(<input type="text" />);
		}
		return form;
	}

	render() {
		console.log(components_map.Markdown.length);

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
				<div>state select: {this.state.value}</div>

				{this.state.value ? this.createComponentForm() : null}
			</React.Fragment>
		);
	}
}
