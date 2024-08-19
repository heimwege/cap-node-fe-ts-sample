import type List from "sap/m/List";
import {wdi5Selector} from "wdio-ui5-service";

// open: typed UI5 controls retrieved from the browser-scope (see https://github.com/ui5-community/wdi5/issues/509)

// eslint-disable-next-line @typescript-eslint/no-extraneous-class
class ObjectPage {
    async iShouldSeeComments (numberOfEntries: number) {
        const commentsListSelector: wdi5Selector = {
            selector: {
                controlType: "sap.m.List",
                id: RegExp("CommentsList")
            }
        };
        const commentsList = await browser.asControl<List>(commentsListSelector);
        // eslint-disable-next-line @typescript-eslint/await-thenable
        const commentsListItems = await commentsList.getItems();
        await expect(commentsListItems.length).toEqual(numberOfEntries);
    }
}

export default new ObjectPage();