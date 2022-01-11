module.exports = {
	env: {
		browser: true,
		amd: true,
		node: true,
	},
	parser: "@typescript-eslint/parser",
	parserOptions: {
		ecmaVersion: 2018,
		sourceType: "module",
		ecmaFeatures: {
			jsx: true, // Allows for the parsing of JSX
		},
	},
	extends: [
		"eslint:recommended",
		"plugin:@typescript-eslint/recommended",
		"plugin:react/recommended",
		// "plugin:react-hooks/recommended",
		"plugin:import/errors",
		"plugin:import/warnings",
		"plugin:import/typescript",
		"plugin:jsx-a11y/recommended",
		"prettier",
		"plugin:prettier/recommended",
	],
	rules: {
		"react/display-name": "off",
		// place to specify ESLint rules - can be used to overwrite rules specified from the extended configs
		// e.g. "@typescript-eslint/explicit-function-return-type": "off",
		"@typescript-eslint/module-boundary-types": "off",
		"react/prop-types": "off",
		"import/no-unresolved": [
			2,
			{
				ignore: ["windi.css"],
			},
		],
	},
	settings: {
		react: {
			version: "detect", // Tells eslint-plugin-react to automatically detect the version of React to use
		},
	},
}
