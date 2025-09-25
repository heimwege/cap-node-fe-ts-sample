import ViewState from "sap/fe/core/controllerextensions/ViewState";
import EditFlow from "sap/fe/core/controllerextensions/EditFlow";
import Routing from "sap/fe/core/controllerextensions/Routing";
import Controller from "sap/ui/core/mvc/Controller";

/**
 * A utility type that extracts the keys of an object `T` that correspond to methods
 * starting with the specified prefix `P`.
 * 
 * @template T - The object type to extract method keys from
 * @template P - The string prefix to match (e.g., "on", "adapt", "apply", "retrieve")
 */
type MethodKeys<T, P extends string> = {
  [K in keyof T]: K extends `${P}${string}` // 1. If the key starts with the prefix...
    ? T[K] extends (...args: any[]) => any // 2. ...and the property is a function...
      ? K // ...keep the key.
      : never
    : never; // 3. Discard all other keys.
}[keyof T]; // 4. Collect the kept keys into a union type.

/**
 * A utility type that combines method keys with multiple prefixes.
 * 
 * @template T - The object type to extract method keys from
 * @template P - A union of string prefixes to match
 */
type MultiPrefixMethodKeys<T, P extends string> = P extends string 
  ? MethodKeys<T, P> 
  : never;

type ControllerExtensionOverrides = Partial<Pick<typeof Controller["prototype"], MethodKeys<typeof Controller["prototype"], "on">>>;

/**
 * Types for Fiori Elements Controller Extension Overrides (sap.ui.core.mvc.ControllerExtension.override).
 */
type FioriElementsControllerExtensionOverrides = ControllerExtensionOverrides & {
    /**
     * experimental
     */
    onPageReady?: () => void;
    editFlow?: Partial<Pick<typeof EditFlow["prototype"], MethodKeys<typeof EditFlow["prototype"], "on">>>;
    routing?: Partial<Pick<typeof Routing["prototype"], MethodKeys<typeof Routing["prototype"], "on">>>;
    viewState?: Partial<Pick<typeof ViewState["prototype"], MultiPrefixMethodKeys<typeof ViewState["prototype"], "on" | "adapt" | "apply" | "retrieve">>>;
};