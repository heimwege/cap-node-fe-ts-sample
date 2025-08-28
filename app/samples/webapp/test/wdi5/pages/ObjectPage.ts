import type List from "sap/m/List";
import {wdi5Selector} from "wdio-ui5-service";
import type { WDI5Control } from "wdio-ui5-service/cjs/lib/wdi5-control";

type MapFunctionToPromise<T> = T extends (...args: infer A) => infer R ? (...args: A) => Promise<R> : T;

type Promised<T> = WDI5Control & {
    [K in keyof T]: MapFunctionToPromise<T[K]>;
}

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
        const commentsList = await browser.asControl<List>(commentsListSelector) as unknown as Promised<List>;
        const commentsListItems = await commentsList.getItems();
        await expect(commentsListItems.length).toEqual(numberOfEntries);
    }
}

export default new ObjectPage();