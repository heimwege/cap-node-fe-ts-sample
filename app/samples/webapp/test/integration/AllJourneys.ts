import ListReport from "sap/fe/test/ListReport";
import ObjectPage from "sap/fe/test/ObjectPage";
import CustomObjectPage from "com/sap/cap/fe/ts/sample/test/integration/pages/ObjectPage";
import CustomListReport from "com/sap/cap/fe/ts/sample/test/integration/pages/ListReport";
import JourneyRunner from "sap/fe/test/JourneyRunner";
import ObjectPageJourney from "com/sap/cap/fe/ts/sample/test/integration/ObjectPageJourney";
import ListReportJourney from "com/sap/cap/fe/ts/sample/test/integration/ListReportJourney";
import type { Config as JourneyRunner$OpaConfig } from "sap/ui/test/Opa5";

// Currently open type errors:
// - property contextPath in oPageDefinition object of ListReport Constructor should be optional
// - property contextPath in oPageDefinition object of ObjectPage Constructor should be optional

type JourneyRunner$Pages = Record<string, ListReport | ObjectPage>;

/**
 * The app id (defined in sap.app.id in the manifest)
 */
const appId = "com.sap.cap.fe.ts.sample";

/**
 * Start JourneyRunner that executes all journeys
 */
getJourneyRunner().run([ListReportJourney, ObjectPageJourney]);

/**
 * Defines an object containing pages that are used to configure the sap.fe.test.JourneyRunner.
 * For each Fiori Elements target of your setup you need to define:
 * - appId: The app id (defined in sap.app.id in the manifest)
 * - componentId: The component id (defined in the target section within the manifest)
 * - entitySet: The entitySet (defined in the settings of the corresponding target component within the manifest)
 *
 * You can enhance the standard functions offered by sap.fe.test with your own functions by adding a class
 * containing actions and assertions to the respective constructor call of the sap.fe.test.* page
 *
 * @returns {JourneyRunner$Pages} the page object
 */
function getPagesToBeTested () {
    const entitySet = "Samples";
    return {
        onTheListReport: new ListReport({
            appId: appId,
            componentId: "SampleListReport",
            entitySet: entitySet,
            contextPath: ""
        }, CustomListReport),

        onTheObjectPage: new ObjectPage({
            appId: appId,
            componentId: "SampleObjectPage",
            entitySet: entitySet,
            contextPath: ""
        }, CustomObjectPage)
    } satisfies JourneyRunner$Pages;
}

/**
 * Initializes and returns a journey runner to be used for opa5 testing
 * @returns {JourneyRunner} the journey runner
 */
function getJourneyRunner () {
    return new JourneyRunner({
        launchUrl: sap.ui.require.toUrl(appId.replace(/\./g, '/')) + "/localService/index.html",
        opaConfig: {
            autoWait: true,
            timeout: 90
        } satisfies JourneyRunner$OpaConfig,
        pages: getPagesToBeTested()
    });
}
