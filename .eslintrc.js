module.exports = {
	env: {
		'node': 'true',
		'browser': 'true',
		'es2021': 'true'
	},
	extends: 'eslint:recommended',
	overrides: [
	],
	parserOptions: {
		'ecmaVersion': 'latest',
		'sourceType': 'module'
	},
	rules: {
		'indent': [
			'error',
			'tab'
		],
		'quotes': [
			'warn',
			'single'
		],
		'semi': [
			'error',
			'always']
	}
};
