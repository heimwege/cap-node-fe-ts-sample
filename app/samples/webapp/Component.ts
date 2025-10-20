import AppComponent from "sap/fe/core/AppComponent";

/**
 * @namespace com.sap.cap.fe.ts.sample
 */
export default class Component extends AppComponent {
    public static readonly metadata = {
        interfaces: ["sap.ui.core.IAsyncContentCreation"],
        manifest: "json"
    };
}
