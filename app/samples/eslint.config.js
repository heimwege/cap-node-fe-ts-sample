const fioriTools  = require('@sap-ux/eslint-plugin-fiori-tools');

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
    ...fioriTools.configs.recommended
];