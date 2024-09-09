import CommentsSectionController from "com/sap/cap/fe/ts/sample/ext/controller/CommentsSection.controller";
//@ts-expect-error: sinon version available at runtime thanks to uio5-tooling-modules
import * as Sinon from "com/sap/cap/fe/ts/sample/resources/sinon";
import ResourceModel from "sap/ui/model/resource/ResourceModel";
import type ResourceBundle from "sap/base/i18n/ResourceBundle";
import type Event from "sap/ui/base/Event";
import type ExtensionAPI from "sap/fe/core/ExtensionAPI";
import { Message } from "com/sap/cap/fe/ts/sample/ext/utils/Constants";
import MessageBox from "sap/m/MessageBox";

type CommentsControllerStub = Pick<typeof CommentsSectionController["prototype"], "getExtensionAPI" | "getResourceBundle" | "onEditComment" | "onDeleteComment" | "onPostComment" | "_createEditCommentDialog"> & {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    overrides: Record<string, Record<string, (...args: any) => any>>
};

let controllerStub: CommentsControllerStub;
let setPropertyCalled = false;
let eventStub: Event;

QUnit.module("Unit test for Task Management UI (Comments Section)", {
    before: () => {
        eventStub = {
            getParameter: () => {
                // only called for parameter 'value'
                return "Test";
            },
            getSource: () => {
                return {
                    getBindingContext: () => {
                        return {
                            getProperty: () => {
                                return "Draft";
                            },
                            setProperty: () => {
                                setPropertyCalled = true;
                            }
                        };
                    }
                };
            }
        } as unknown as Event;

        const resourceBundle = new ResourceModel({ bundleUrl: sap.ui.require.toUrl("com/sap/cap/fe/ts/sample") + "/i18n/i18n.properties" }).getResourceBundle() as ResourceBundle;

        //@ts-expect-error: this is an instantiation of a controller stub for testing purposes
        const commentsSectionControllerStub = new CommentsSectionController() as CommentsSectionController;

        controllerStub = {
            getExtensionAPI: function () {
                return {
                    getEditFlow: () => {
                        return {
                            securedExecution: () => {
                                return new Promise(() => {
                                    throw new Error("Test error");
                                });
                            }
                        };
                    }
                } as unknown as ExtensionAPI;
            },
            getResourceBundle: function () {
                return resourceBundle;
            },
            onEditComment: function (event: Event) {
                commentsSectionControllerStub.onEditComment.call(this, event);
            },
            onDeleteComment: function (event: Event) {
                return commentsSectionControllerStub.onDeleteComment.call(this, event);
            },
            onPostComment: function (event: Event) {
                return commentsSectionControllerStub.onPostComment.call(this, event);
            },
            _createEditCommentDialog: function () {
                return Promise.resolve();
            },
            overrides: {
                editFlow: {
                    onBeforeSave: function () {
                        // @ts-expect-error getOverrides() unknown; will reflect 'overrides' of respective controller
                        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-call
                        commentsSectionControllerStub.getMetadata().getOverrides().editFlow.onBeforeSave.call(controllerStub);
                    }
                }
            }
        };
    },
    beforeEach: () => {
        // nothing
    },
    afterEach: () => {
        // nothing
    },
    after: () => {
        // nothing
    }
} as Hooks, undefined);

// eslint-disable-next-line @typescript-eslint/no-misused-promises
QUnit.test("test onBeforeSave hook opens a message box of type success", async assert => {
    const messageBoxStub = Sinon.stub(MessageBox, "success");

    await controllerStub.overrides.editFlow.onBeforeSave();

    const expectedText = controllerStub.getResourceBundle().getText("CallbackSuccess");
    const actualText = messageBoxStub.getCall(0).args[0];

    assert.strictEqual(actualText, expectedText);

    messageBoxStub.restore();
});

// eslint-disable-next-line @typescript-eslint/no-misused-promises
QUnit.test("Check that errors are displayed", async assert => {
    const utilsStub = Sinon.stub(MessageBox, "error");

    await controllerStub.onDeleteComment(eventStub);

    const expectedText = controllerStub.getResourceBundle().getText(Message.error.GENERIC);
    let actualText = utilsStub.getCall(0).args[0];

    assert.strictEqual(actualText, expectedText, "Error when deleting comment is displayed");

    await controllerStub.onPostComment(eventStub);

    actualText = utilsStub.getCall(1).args[0];

    assert.strictEqual(actualText, expectedText, "Error when posting comment is displayed");

    utilsStub.restore();
});

QUnit.test("Check that 'type' property of comment not changed when already 'Draft'", assert => {
    controllerStub.onEditComment(eventStub);

    assert.strictEqual(setPropertyCalled, false);
});
