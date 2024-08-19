import type { MockDataContributor } from "@sap-ux/ui5-middleware-fe-mockserver";
import type { Comments } from "../../ext/types/gen/CapFeTsSampleServiceModel";
import type ODataRequest from "@sap-ux/fe-mockserver-core/dist/request/odataRequest";
import type { KeyDefinitions } from "@sap-ux/fe-mockserver-core/dist/request/odataRequest";

const mockDataContributor: MockDataContributor<Comments> = {
    /**
     * @overwrite
     * @param {Comments} mockEntry the entry to be added to the entity
     * @param {ODataRequest} odataRequest the odata request
     */
    addEntry (mockEntry: Comments, odataRequest: ODataRequest) {
        if (!mockEntry.IsActiveEntity && !mockEntry.HasActiveEntity) {
            mockEntry.type = "Draft";
            mockEntry.createdBy = "michael.adams@example.com";
        } else if (mockEntry.IsActiveEntity) {
            mockEntry.type = "";
        }
        void this.base?.addEntry(mockEntry, odataRequest);
    },

    /**
     * @overwrite
     * @param {KeyDefinitions} keyValues the key of the entity to be changed
     * @param {Comments} newData the values of the entity to be changed
     * @param {Comments} updatedData the data that has changed
     * @param {ODataRequest} odataRequest the odata request
     * @returns {Promise<void>} a promise that is resolved when the entry is updated
     */
    updateEntry (keyValues: KeyDefinitions, newData: Comments, updatedData: Comments, odataRequest: ODataRequest) {
        if (newData.IsActiveEntity) {
            newData.type = "";
        } else {
            newData.type = newData.type === "Draft" ? "Draft" : "Edited";
        }
        return Promise.resolve(this.base?.updateEntry(keyValues, newData, odataRequest));
    }
};

module.exports = mockDataContributor;
