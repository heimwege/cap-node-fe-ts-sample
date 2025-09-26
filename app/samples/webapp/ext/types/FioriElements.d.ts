import ViewState from "sap/fe/core/controllerextensions/ViewState";
import EditFlow from "sap/fe/core/controllerextensions/EditFlow";
import Routing from "sap/fe/core/controllerextensions/Routing";
import Controller from "sap/ui/core/mvc/Controller";

type ControllerExtensionOverrides = Partial<Pick<typeof Controller["prototype"], "onAfterRendering" | "onBeforeRendering" | "onExit" | "onInit">>;

/**
 * Types for Fiori Elements Controller Extension Overrides (sap.ui.core.mvc.ControllerExtension.override).
 */
type FioriElementsControllerExtensionOverrides = ControllerExtensionOverrides & {
    /**
     * experimental
     */
    onPageReady?: () => void;
    editFlow?: Partial<Pick<typeof EditFlow["prototype"], "onAfterCreate" | "onAfterDelete" | "onAfterDiscard" | "onAfterEdit" | "onAfterSave" | "onBeforeCreate" | "onBeforeDelete" | "onBeforeDiscard" | "onBeforeEdit" | "onBeforeSave">>;
    routing?: Partial<Pick<typeof Routing["prototype"], "onAfterBinding" | "onBeforeBinding" | "onBeforeNavigation">>;
    viewState?: Partial<Pick<typeof ViewState["prototype"], "adaptBindingRefreshControls" | "adaptBindingRefreshHandler" | "adaptControlStateHandler" |"adaptStateControls" | "applyAdditionalStates" | "applyInitialStateOnly" | "applyNavigationParameters" | "onAfterStateApplied" | "onBeforeStateApplied" | "retrieveAdditionalStates">>;
};