import opaTest from "sap/ui/test/opaQunit";
import type { Given, When, Then } from "com/sap/cap/fe/ts/sample/test/integration/types/OpaJourneyTypes";

export default function () {
    // there should be no blanks in Qunit module name in case of a piper based traceability mapping
    QUnit.module("ObjectPage");

    opaTest("Should be able to navigate from the List Report to the Object Page", function (Given: Given, When: When, Then: Then) {
        Given.iResetMockData({ServiceUri: "/odata/v4/CapFeTsSampleService/"});
        Given.iResetTestData();
        Given.iStartMyApp("Samples-display", { "sap-ui-xx-viewCache": false, "sap-ui-language": "en"});

        When.onTheListReport.onTable("").iPressRow({ name: "Test" });

        Then.onTheObjectPage.onHeader().iCheckTitle("Test");
    });

    opaTest("Should see the Object Page Sections", function (Given: Given, When: When, Then: Then) {
        Then.onTheObjectPage.iShouldSeeSection("CommentsSection");
    });

    opaTest("Should see the Object Page in edit mode", function (Given: Given, When: When, Then: Then) {
        When.onTheObjectPage.onHeader().iExecuteEdit();

        Then.onTheObjectPage.iShouldSeeSection("EditableHeaderSection");
        Then.onTheObjectPage.iShouldSeeSection("CommentsSection");
    });

    opaTest("Should see the editable header content", function (Given: Given, When: When, Then: Then) {
        Then.onTheObjectPage.iShouldSeeField("Field", "sap.m.Input");
    });

    opaTest("Should be able to add a comment and save", function (Given: Given, When: When, Then: Then) {
        Then.onTheObjectPage.iShouldSeeComments(1);

        When.onTheObjectPage.iGoToSection("Comments");
        When.onTheObjectPage.iAddComment("Test");
        When.onTheObjectPage.onFooter().iExecuteSave();
        When.onTheObjectPage.onDialog("").iConfirm();

        Then.onTheObjectPage.iShouldSeeComments(2);
    });

    opaTest("Should be able to add a comment and cancel", function (Given: Given, When: When, Then: Then) {
        When.onTheObjectPage.onHeader().iExecuteEdit();
        When.onTheObjectPage.iAddComment("Test2");
        When.onTheObjectPage.onFooter().iExecuteCancel();
        When.onTheObjectPage.onFooter().iConfirmCancel();

        Then.onTheObjectPage.iShouldSeeComments(2);
    });

    opaTest("Should be able to delete a comment and cancel", function (Given: Given, When: When, Then: Then) {
        When.onTheObjectPage.onHeader().iExecuteEdit();
        When.onTheObjectPage.iDeleteComment(0);
        When.onTheObjectPage.onFooter().iExecuteCancel();
        When.onTheObjectPage.onFooter().iConfirmCancel();

        Then.onTheObjectPage.iShouldSeeComments(2);
    });

    opaTest("Should be able to edit a comment and cancel", function (Given: Given, When: When, Then: Then) {
        When.onTheObjectPage.onHeader().iExecuteEdit();
        When.onTheObjectPage.iEditComment(0, "TestTest");
        When.onTheObjectPage.onFooter().iExecuteCancel();
        When.onTheObjectPage.onFooter().iConfirmCancel();

        Then.onTheObjectPage.iShouldSeeComments(2);
    });

    opaTest("Should be able to return to the list report", function (Given: Given, When: When, Then: Then) {
        When.onTheObjectPage.iNavigateBack();

        Then.onTheListReport.onTable("").iCheckRows(undefined, 3);
    });

    opaTest("I tear down the app", function (Given: Given) {
        // Cleanup
        Given.iTearDownMyApp();
    });
}
