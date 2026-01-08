const fioriTools  = require('@sap-ux/eslint-plugin-fiori-tools');
const tsParser = require('@typescript-eslint/parser');

module.exports = [
    {
        ignores: [
            '/dist',
            '/node_modules',
            '/target'
        ],
        rules: {
            'linebreak-style': 0
        }
    },
    ...fioriTools.configs.recommended,
    {
        // OVERRIDE: Re-include localService TS files
        files: ['webapp/localService/**/*.ts'],
        languageOptions: {
            parser: tsParser,
            sourceType: 'module',
            ecmaVersion: 'latest'
        },
        rules: {
            'linebreak-style': 0
        }
    },
];