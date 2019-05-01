import React from 'react';
import ReactDOM from 'react-dom';

const component = () => <h1>Admin panel</h1>;

console.log(document.getElementById('app'));

ReactDOM.render(React.createElement(component), document.getElementById('app'));
