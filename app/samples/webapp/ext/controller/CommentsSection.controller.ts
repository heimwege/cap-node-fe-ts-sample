import ControllerExtension from "sap/ui/core/mvc/ControllerExtension";
import Fragment from "sap/ui/core/Fragment";
import type v4Context from "sap/ui/model/odata/v4/Context";
import type List from "sap/m/List";
import type { FeedInput$PostEvent } from "sap/m/FeedInput";
import type ODataListBinding from "sap/ui/model/odata/v4/ODataListBinding";
import type { FeedListItemAction$PressEvent } from "sap/m/FeedListItemAction";
import type Dialog from "sap/m/Dialog";
import { Message, Model, Ui } from "com/sap/cap/fe/ts/sample/ext/utils/Constants";
import type PageController from "sap/fe/core/PageController";
import type ResourceModel from "sap/ui/model/resource/ResourceModel";
import type ResourceBundle from "sap/base/i18n/ResourceBundle";
import MessageBox from "sap/m/MessageBox";
import type { EditableComments } from "com/sap/cap/fe/ts/sample/ext/types/gen/CapFeTsSampleServiceModel";
import { FioriElementsControllerExtensionOverrides } from "com/sap/cap/fe/ts/sample/ext/types/FioriElements";

/**
 * @namespace com.sap.cap.fe.ts.sample.ext.controller
 */
export default class CommentsSection extends ControllerExtension {
    /**
     * Workaround for missing the correct controller extension type
     * @protected
     */
    protected base!: PageController;

    /**
     * Overrides (sap.ui.core.mvc.ControllerExtension.override)
     */
    static overrides: FioriElementsControllerExtensionOverrides = {
        editFlow: {
            onBeforeSave: function (this: CommentsSection) {
                MessageBox.success(this.getResourceBundle().getText("CallbackSuccess") as string);
                return Promise.resolve();
            }
        }
    };

    /**
     * Get the fiori elements extension API
     * @return {ExtensionAPI} the extension API
     */
    getExtensionAPI () {
        return this.base.getExtensionAPI();
    }

    /**
     * Callback function for comments to be created
     * @param {Event} event the source
     * @return {Promise} A promise that is resolved once the post has been done
     */
    onPostComment (event: FeedInput$PostEvent) {
        const newComment = event.getParameter("value");

        const functionToBeExecuted = () => {
            return (this.getCommentsList()?.getBinding("items") as ODataListBinding).create({
                text: String(newComment),
                type: this.getResourceBundle().getText("draft") as string
            } satisfies EditableComments);
        };

        return this.getExtensionAPI().getEditFlow().securedExecution(functionToBeExecuted)
            .catch(() => {
                MessageBox.error(this.getResourceBundle().getText(Message.error.GENERIC) as string);
            });
    }

    /**
     * Get list containing the comments
     * @return {List|undefined} The list
     */
    getCommentsList () {
        return this.getView().byId(Ui.commentsList.ID) as List | undefined;
    }

    /**
     * Get the resource bundle
     * @return {ResourceBundle} the resource bundle
     */
    getResourceBundle () {
        return (this.getView().getModel(Model.i18n.NAME) as ResourceModel).getResourceBundle() as ResourceBundle;
    }

    /**
     * Change the selected comment
     * @param {Event} event the source
     */
    onEditComment (event: FeedListItemAction$PressEvent) {
        const bindingContext = event.getSource().getBindingContext() as v4Context;
        if (bindingContext.getProperty("type") !== this.getResourceBundle().getText("draft")) {
            void bindingContext.setProperty("type", this.getResourceBundle().getText("edited"));
        }
        void this._createEditCommentDialog(bindingContext);
    }

    /**
     * Creates a dialog to edit comments
     * @param {v4Context} bindingContext the binding context to be inherited to the dialog
     * @private
     */
    async _createEditCommentDialog (bindingContext: v4Context) {
        const dialog = await this.getExtensionAPI().loadFragment({
            id: Ui.fragment.editCommentDialog.ID,
            name: Ui.fragment.editCommentDialog.NAME,
            controller: this
        }) as Dialog;
        this.getView().addDependent(dialog);
        dialog.setBindingContext(bindingContext);
        dialog.open();
    }

    /**
     * Handles the dialog close button
     */
    onCloseDialog () {
        Fragment.byId(Ui.fragment.editCommentDialog.ID, Ui.fragment.editCommentDialog.EDIT_COMMENT_DIALOG)?.destroy();
    }

    /**
     * Delete the selected comment
     * @param {Event} event the source
     * @return {Promise} A promise that is resolved once the deletion has been done
     */
    onDeleteComment (event: FeedListItemAction$PressEvent) {
        const source = event.getSource();
        const functionToBeExecuted = () => {
            return (source.getBindingContext() as v4Context).delete();
        };

        return this.getExtensionAPI().getEditFlow().securedExecution(functionToBeExecuted)
            .catch(() => {
                MessageBox.error(this.getResourceBundle().getText(Message.error.GENERIC) as string);
            });
    }
}
