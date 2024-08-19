import Opa5 from "sap/ui/test/Opa5";

export const actions = {};

export const assertions = {
    // copied from sap.fe.test.ObjectPage.js
    iSeeContactDetailsPopover (this: Opa5, sTitle: string) {
        return this.waitFor({
            controlType: "sap.ui.mdc.link.Panel",
            success: function () {
                Opa5.assert.ok("Contact card with title '" + sTitle + "' is present");
            },
            errorMessage: "Did not find the Contact card with title '" + sTitle
        });
    }
};

export default class ListReport {
    actions = actions;
    assertions = assertions;
}