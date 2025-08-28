import CommentsSectionController from "com/sap/cap/fe/ts/sample/ext/controller/CommentsSection.controller";
import * as Sinon from "sinon";
import ResourceModel from "sap/ui/model/resource/ResourceModel";
import type ResourceBundle from "sap/base/i18n/ResourceBundle";
import Event from "sap/ui/base/Event";
import ExtensionAPI from "sap/fe/core/ExtensionAPI";
import { Message } from "com/sap/cap/fe/ts/sample/ext/utils/Constants";
import MessageBox from "sap/m/MessageBox";
import FeedListItem from "sap/m/FeedListItem";
import v4Context from "sap/ui/model/odata/v4/Context";

//@ts-expect-error: this is an instantiation of a controller for testing purposes
const commentsSectionController = new CommentsSectionController() as CommentsSectionController;
const sandbox = Sinon.createSandbox();
const resourceBundle = new ResourceModel({
    bundleUrl: sap.ui.require.toUrl("com/sap/cap/fe/ts/sample") + "/i18n/i18n.properties"
}).getResourceBundle() as ResourceBundle
let fakeFeedListItem = new FeedListItem();
let fakeEvent = new Event("test", fakeFeedListItem, {}) as Event;

QUnit.module("Unit test for Task Management UI (Comments Section)", {
    beforeEach: () => {
        sandbox.stub(commentsSectionController, "getResourceBundle").returns(resourceBundle);
        sandbox.stub(fakeEvent, "getParameter").resolves();
        sandbox.stub(fakeEvent, "getSource").returns(fakeFeedListItem);
    },
    afterEach: () => {
        sandbox.restore();
    }
} satisfies Hooks);

// eslint-disable-next-line @typescript-eslint/no-misused-promises
QUnit.test("Check that onBeforeSave callback opens a MessageBox of type success", async assert => {
    const messageBoxSuccessStub = sandbox.stub(MessageBox, "success");

    // @ts-expect-error getOverrides() unknown; will reflect 'overrides' of respective controller
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-call
    await commentsSectionController.getMetadata().getOverrides().editFlow.onBeforeSave.call(commentsSectionController);

    const expectedText = commentsSectionController.getResourceBundle().getText("CallbackSuccess");
    const actualText = messageBoxSuccessStub.getCall(0).args[0];

    assert.strictEqual(actualText, expectedText);
});

// eslint-disable-next-line @typescript-eslint/no-misused-promises
QUnit.test("Check that errors are being displayed when securedExecution fails", async assert => {
    const messageBoxErrorStub = sandbox.stub(MessageBox, "error");
    sandbox.stub(commentsSectionController, "getExtensionAPI").returns({
        getEditFlow: () => {
            return {
                securedExecution: _fnFunction => Promise.reject(new Error("Test error"))
            };
        }
    } as ExtensionAPI);

    await commentsSectionController.onDeleteComment(fakeEvent);

    const expectedText = commentsSectionController.getResourceBundle().getText(Message.error.GENERIC);
    let actualText = messageBoxErrorStub.getCall(0).args[0];
    assert.strictEqual(actualText, expectedText, "Error when deleting comment is displayed");

    await commentsSectionController.onPostComment(fakeEvent);

    actualText = messageBoxErrorStub.getCall(1).args[0];
    assert.strictEqual(actualText, expectedText, "Error when posting comment is displayed");
});

QUnit.test("Check that 'type' property of comment is not being changed in case of edit when already 'Draft'", assert => {
    //@ts-expect-error: this is an instantiation of a context for testing purposes
    const fakeBindingContext = new Context() as v4Context;
    sandbox.stub(fakeFeedListItem, "getBindingContext").returns(fakeBindingContext);
    sandbox.stub(fakeBindingContext, "getProperty").returns(commentsSectionController.getResourceBundle().getText("draft"));
    const setPropertyStub = sandbox.stub(fakeBindingContext, "setProperty").resolves();
    sandbox.stub(commentsSectionController, "_createEditCommentDialog").resolves();

    commentsSectionController.onEditComment(fakeEvent);

    assert.strictEqual(setPropertyStub.getCalls().length, 0);
});
