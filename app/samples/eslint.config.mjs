import fioriTools from '@sap-ux/eslint-plugin-fiori-tools';

export default [
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
