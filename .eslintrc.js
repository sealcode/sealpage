module.exports = {
	env: {
		browser: true,
		es6: true,
	},
	extends: "eslint:recommended",
	parserOptions: {
		ecmaVersion: 2016,
	},
	rules: {
		indent: ["error", "tab"],
		"linebreak-style": ["error", "unix"],
		quotes: ["error", "double"],
		semi: ["error", "always"],
	},
};
