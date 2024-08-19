import Opa5 from "sap/ui/test/Opa5";
import Press from "sap/ui/test/actions/Press";
import EnterText from "sap/ui/test/actions/EnterText";
import PropertyStrictEquals from "sap/ui/test/matchers/PropertyStrictEquals";
import AggregationLengthEquals from "sap/ui/test/matchers/AggregationLengthEquals";
import type FeedInput from "sap/m/FeedInput";
import type UI5Element from "sap/ui/core/Element";

export const actions = {
    iNavigateBack (this: Opa5) {
        return this.waitFor({
            success: function () {
                Opa5.getWindow().history.back();
            }
        });
    },
    iPressButton (this: Opa5, partOfTheId: string) {
        return this.waitFor({
            controlType: "sap.m.Button",
            id: new RegExp(partOfTheId),
            actions: new Press(),
            success: () => {
                Opa5.assert.ok(true, "Button " + partOfTheId + " found and pressed.");
            },
            errorMessage: "Button " + partOfTheId + " not found."
        });
    },
    iPressButtonWithTextAndIcon (this: Opa5, text: string, icon: string) {
        return this.waitFor({
            controlType: "sap.m.Button",
            matchers: [
                new PropertyStrictEquals({
                    name: "text",
                    value: text
                }),
                new PropertyStrictEquals({
                    name: "icon",
                    value: icon
                })
            ],
            actions: new Press(),
            success: () => {
                Opa5.assert.ok(true, String(text) + " button pressed.");
            },
            errorMessage: "Did not find " + String(text) + " button."
        });
    },
    iAddComment (this: Opa5, text: string) {
        return this.waitFor({
            controlType: "sap.m.FeedInput",
            id: new RegExp("CommentsInput"),
            success: (elements: Array<UI5Element> | UI5Element) => {
                const feedInput = Array.isArray(elements) ? elements[0] as FeedInput : elements as FeedInput;
                feedInput.setValue(text);
                feedInput.firePost();
                Opa5.assert.ok(true, "Comment text added");
            },
            errorMessage: "FeedInput not found. Can't add comment text"
        });
    },
    iDeleteComment (indexOfItem: int) {
        const opa5 = this as unknown as Opa5;
        this.iPressButton.call(opa5, "CommentsList-" + String(indexOfItem) + "-actionButton");
        this.iPressButtonWithTextAndIcon.call(opa5, "Delete", "sap-icon://decline");
    },
    iEditComment (indexOfItem: int, text: string) {
        const opa5 = this as unknown as Opa5;
        this.iPressButton.call(opa5, "CommentsList-" + String(indexOfItem) + "-actionButton");
        this.iPressButtonWithTextAndIcon.call(opa5, "Edit", "sap-icon://edit");
        opa5.waitFor({
            controlType: "sap.m.TextArea",
            id: new RegExp("editCommentDialogFragment--editComment"),
            actions: new EnterText({ text: text }),
            success: () => {
                Opa5.assert.ok(true, "Text entered.");
            },
            errorMessage: "Unable to enter text."
        });
        return this.iPressButton.call(opa5, "editCommentDialogFragment--closeDialog");
    }
};

export const assertions = {
    iShouldSeeSection (this: Opa5, partOfTheId: string) {
        return this.waitFor({
            controlType: "sap.uxap.ObjectPageSection",
            id: new RegExp(partOfTheId),
            success: function () {
                Opa5.assert.ok(true, "Section " + partOfTheId + " found.");
            },
            errorMessage: "Section " + partOfTheId + " not found."
        });
    },
    iShouldSeeField: function (this: Opa5, partOfTheId: string, controlType: string) {
        return this.waitFor({
            controlType: controlType,
            id: new RegExp(partOfTheId),
            success: (fields: Array<UI5Element>) => {
                if (fields.length === 1) {
                    Opa5.assert.ok(true, "Field with id '" + partOfTheId + "' found.");
                } else {
                    Opa5.assert.ok(false, "Found more than one matching field for id '" + partOfTheId + "'.");
                }
            },
            errorMessage: "Did not find the field with id '" + partOfTheId + "'."
        });
    },
    iShouldSeeComments (this: Opa5, numberOfEntries: number) {
        return this.waitFor({
            controlType: "sap.m.List",
            id: new RegExp("CommentsList"),
            matchers: new AggregationLengthEquals({
                name: "items",
                length: numberOfEntries
            }),
            success: () => {
                Opa5.assert.ok(true, "Feed contains " + String(numberOfEntries) + " comments");
            },
            errorMessage: "Did not find the feed or feed does not have " + String(numberOfEntries) + " comments."
        });
    }
};

export default class ObjectPage{
    actions = actions;
    assertions = assertions;
}
