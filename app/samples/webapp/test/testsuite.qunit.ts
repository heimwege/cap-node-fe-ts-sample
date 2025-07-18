export default {
    name: "QUnit test suite for the UI5 Application: uimodule",
    defaults: {
        page: "ui5://test-resources/com/sap/cap/fe/ts/sample/Test.qunit.html?testsuite={suite}&test={name}",
        qunit: {
            version: 2
        },
        sinon: {
            version: 4
        },
        ui5: {
            language: "EN",
            theme: "sap_horizon"
        },
        coverage: {
            only: "com/sap/cap/fe/ts/sample/",
            never: "test-resources/com/sap/cap/fe/ts/sample/"
        },
        loader: {
            paths: {
                "com/sap/cap/fe/ts/sample": "../"
            }
        }
    },
    tests: {
        "unit/unitTests": {
            title: "Unit tests for com/sap/cap/fe/ts/sample"
        },
        "integration/opaTests": {
            title: "Integration tests for com/sap/cap/fe/ts/sample"
        }
    }
};