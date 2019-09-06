const path = require('path');
const r = require.resolve;

module.exports = ec_path => ({
	devtool: 'eval-source-maps',
	entry: {
		'bundle.js': [
			path.resolve(__dirname, './admin-panel/index.tsx'),
			...ec_path,
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
			{
				test: /\.s?css$/,
				use: [r('style-loader'), r('css-loader'), r('sass-loader')],
			},
			{
				test: /\.svg$/,
				use: [
					{
						loader: r('babel-loader'),
						options: {
							presets: [
								r('@babel/preset-env'),
								r('@babel/preset-react'),
							],
							plugins: [r('@babel/plugin-transform-react-jsx')],
						},
					},
					{
						loader: r('react-svg-loader'),
						options: {
							jsx: true,
						},
					},
				],
			},
			{
				test: /\.(woff(2)?|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
				use: [
					{
						loader: r('file-loader'),
						options: {
							name: '[name].[ext]',
							outputPath: 'fonts/',
						},
					},
				],
			},
			{
				test: /\.tsx?$/,
				use: r('ts-loader'),
				exclude: /node_modules/,
			},
		],
	},
	resolve: {
		extensions: ['.js', '.jsx', '.scss', '.svg', '.ts', '.tsx'],
	},
	mode: 'development',
});
