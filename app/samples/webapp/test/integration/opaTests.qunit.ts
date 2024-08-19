void Promise.all([
    import("sap/ui/thirdparty/qunit-2"), //Bootstrap QUnit
    import("com/sap/cap/fe/ts/sample/test/integration/AllJourneys")
]).then(() => {
    // start of journeys is done automatically by loading AllJourneys
});
