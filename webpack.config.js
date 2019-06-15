const path = require('path');
const r = require.resolve;

module.exports = plugins_path => ({
	devtool: 'eval-source-maps',
	entry: {
		'bundle.js': [
			path.resolve(__dirname, './admin-panel/index.jsx'),
			...plugins_path,
		],
	},
	output: {
		filename: '[name]',
		path: path.resolve(__dirname, './public-admin'),
	},
	module: {
		rules: [
			{
				test: /\.jsx?$/,
				exclude: path.resolve(__dirname, 'node_modules'),
				use: {
					loader: r('babel-loader'),
					options: {
						presets: [
							r('@babel/preset-env'),
							r('@babel/preset-react'),
						],
						plugins: [r('@babel/plugin-transform-react-jsx')],
					},
				},
			},
		],
	},
	resolve: {
		extensions: ['.js', '.jsx'],
	},
	mode: 'development',
});
