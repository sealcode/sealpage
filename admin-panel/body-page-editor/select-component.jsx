import React from 'react';
import components_map from '../../components/components.map.js';

export default function selectComponent(props) {
	return (
		<select
			id="select-component"
			onChange={e => props.onChange(e.target.value)}
			value={props.value}
		>
			<option value="">--Please choose an option--</option>

			{Object.keys(components_map).map(component => {
				return (
					<option key={component} value={component}>
						{component}
					</option>
				);
			})}
		</select>
	);
}
