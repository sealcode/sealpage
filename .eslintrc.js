module.exports = {
	env: {
		browser: true,
		es6: true,
		amd: true,
		node: true,
	},
	globals: {
		require: true,
	},
	extends: ['eslint:recommended', 'plugin:react/recommended'],
	parser: 'babel-eslint',
	parserOptions: {
		ecmaVersion: 6,
		sourceType: 'module',
		ecmaFeatures: {
			jsx: true,
			modules: true,
			experimentalObjectRestSpread: true,
		},
	},
	rules: {
		indent: ['error', 'tab'],
		'linebreak-style': ['error', 'unix'],
		quotes: ['error', 'single'],
		semi: ['error', 'always'],
		'no-console': 'off',
		'no-mixed-spaces-and-tabs': ['error', 'smart-tabs'],
		'react/prop-types': 0,
	},
};
