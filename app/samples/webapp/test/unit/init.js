sap.ui.loader.config({
    map: {
        '*': {
            'sinon': null //default is sap/ui/thirdparty/sinon
        }
    },
    shim: {
        "sap/ui/qunit/qunit-junit": {
            deps: ["sap/ui/thirdparty/qunit-2"]
        },
        "sap/ui/qunit/qunit-coverage": {
            deps: ["sap/ui/thirdparty/qunit-2"]
        }
    }
});

window.QUnit = Object.assign({}, window.QUnit, { config: { autostart: false } });

sap.ui.require([
    "sap/ui/thirdparty/qunit-2",
    "sap/ui/qunit/qunit-junit",
    "sap/ui/qunit/qunit-coverage"
], function (QUnit) {
    'use strict';
    sap.ui.require(["com/sap/cap/fe/ts/sample/test/unit/controller/CommentsSectionControllerTest"], function() {
        QUnit.start();
    });
});
