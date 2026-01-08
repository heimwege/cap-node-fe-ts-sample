const fioriTools  = require('@sap-ux/eslint-plugin-fiori-tools');
const tsParser = require('@typescript-eslint/parser');

module.exports = [
    {
        ignores: [
            '/dist',
            '/node_modules',
            '/target',
            'webapp/localService/mockdata/*.js',
            'webapp/localService/mockdata/*.js.map'
        ],
        rules: {
            'linebreak-style': 0
        }
    },
    ...fioriTools.configs.recommended,
    {
        // 3. OVERRIDE: Re-include and fix parsing for localService TS files
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