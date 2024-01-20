module.exports = {
	extends: ['stylelint-config-standard', 'stylelint-config-html', 'stylelint-config-recess-order'],
	plugins: ['stylelint-order'],
	rules: {
		'selector-pseudo-element-colon-notation': 'double',
		'order/order': ['custom-properties', 'declarations']
	},
	ignoreFiles: ['**/node_modules/**']
};
