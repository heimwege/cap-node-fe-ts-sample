import { wdi5 } from "wdio-ui5-service";
import type { FioriElementsFacade, FioriElementsTestBrowser } from "../types/Wdi5ScenarioTypes";

// there should be no blanks in the title in case of a piper based traceability mapping
describe("ListReport", () => {
    before(async () => {
        // browser timeout has to be higher than the 'waitForUI5Timeout' of the wdio configuration!
        await browser.setTimeout({ script: 40000 });
        await wdi5.goTo("#Samples-display");
    });
    let fioriElementsFacade: FioriElementsFacade;
    before(async () => {
        const appId = "com.sap.cap.fe.ts.sample";
        const entitySet = "Samples";
        fioriElementsFacade = await (browser as FioriElementsTestBrowser).fe.initialize({
            onTheListReport: {
                ListReport: {
                    appId: appId,
                    componentId: "SampleListReport",
                    entitySet: entitySet
                }
            },
            onTheObjectPage: {
                ObjectPage: {
                    appId: appId,
                    componentId: "SampleObjectPage",
                    entitySet: entitySet
                }
            },
            onTheShell: {
                Shell: {}
            }
        });
    });

    it("Check existing table entries", async () => {
        await fioriElementsFacade.execute((Given, When, Then) => {
            When.onTheListReport.onFilterBar().iExecuteSearch();
            Then.onTheListReport.onTable("").iCheckRows(undefined, 3);
        });
    });
});
