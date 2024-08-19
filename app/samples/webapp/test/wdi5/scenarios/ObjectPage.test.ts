import { wdi5 } from "wdio-ui5-service";
import onTheObjectPage from "../pages/ObjectPage";
import type { FioriElementsFacade, FioriElementsTestBrowser } from "../types/Wdi5ScenarioTypes";

let fioriElementsFacade: FioriElementsFacade;

// there should be no blanks in the title in case of a piper based traceability mapping
describe("ObjectPage", () => {
    before(async () => {
        // browser timeout has to be higher than the 'waitForUI5Timeout' of the wdio configuration!
        await browser.setTimeout({ script: 40000 });
        await wdi5.goTo("#Samples-display");
    });

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

    it("Check navigation from List Report to Object Page", async () => {
        await fioriElementsFacade.execute((Given, When, Then) => {
            When.onTheListReport.onTable("").iPressRow({ name: "Test" });
            Then.onTheObjectPage.onHeader().iCheckTitle("Test");
        });
    });

    it("Check existing comments", async () => {
        await onTheObjectPage.iShouldSeeComments(1);
    });
});
