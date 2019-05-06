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
			componentType: '',
		};
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.renderPreview = this.renderPreview.bind(this);
	}

	componentDidMount() {
		console.log(components_map.Markdown('# Test'));
	}

	handleChange(event) {
		this.setState({ componentType: event.target.value });
	}

	handleSubmit(event) {
		let args = [];

		for (let element of event.target.children) {
			if (element.type !== 'submit') args.push(element.value);
			element.value = '';
		}

		let createdComponents = this.state.createdComponents;
		createdComponents.push({
			component: this.state.componentType,
			args,
		});

		this.setState({
			createdComponents,
		});
	}

	async renderPreview() {
		let html = '';
		for (const segment of this.state.createdComponents) {
			// TO DO: push data from segment element to function html.js
			html += await components_map[segment.component](...segment.args);
		}
		console.log(html);
		return html;
	}

	createComponentForm() {
		let form = [];
		console.log('create component form');

		for (
			let i = 0;
			i < components_map[this.state.componentType].length;
			i++
		) {
			// TO DO: we have to consider using typescript for components or documented code of parameters to sealpage components
			form.push(
				<input type="text" id={`${this.state.componentType}-${i}`} />
			);
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

				<div>Selected component: {this.state.componentType}</div>

				<form onSubmit={this.handleSubmit}>
					{this.state.componentType
						? this.createComponentForm()
						: null}
					<input type="submit" value="Submit component" />
				</form>

				<button onClick={this.renderPreview}>Render preview</button>
			</React.Fragment>
		);
	}
}
