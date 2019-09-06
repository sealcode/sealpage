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
	plugins: ['@typescript-eslint'],
	extends: [
		'eslint:recommended',
		'plugin:react/recommended',
		'plugin:@typescript-eslint/recommended',
	],
	parser: '@typescript-eslint/parser',
	parserOptions: {
		ecmaVersion: 6,
		sourceType: 'module',
		ecmaFeatures: {
			jsx: true,
			modules: true,
			experimentalObjectRestSpread: true,
		},
		project: './tsconfig.json',
		tsconfigRootDir: __dirname,
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
