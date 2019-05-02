import React from 'react';
import ReactDOM from 'react-dom';

const component = () => <h1>Admin panel</h1>;

console.log(document.getElementById('app'));

const url = 'http://localhost:8080/api/v1/specifications';
// const data = { username: 'example' };

fetch(url, {
	method: 'GET',
	// body: JSON.stringify(data),
	headers: {
		'Content-Type': 'application/json',
	},
})
	.then(res => res.json())
	.then(response => console.log('Success:', JSON.stringify(response)))
	.catch(error => console.error('Error:', error));

ReactDOM.render(React.createElement(component), document.getElementById('app'));
