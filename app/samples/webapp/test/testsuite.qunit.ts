type JsUnitTestSuite = {
    new(): JsUnitTestSuite
    addTestPage: (url: string) => void
}

interface Window {
    suite: () => object
    jsUnitTestSuite: JsUnitTestSuite
}

(window as Window).suite = () => {
    // eslint-disable-next-line new-cap
    const suite = new parent.jsUnitTestSuite();
    const contextPath = location.pathname.substring(0, location.pathname.lastIndexOf("/") + 1);

    suite.addTestPage(contextPath + "integration/opaTests.qunit.html");
    suite.addTestPage(contextPath + "unit/unitTests.qunit.html");

    return suite;
};
