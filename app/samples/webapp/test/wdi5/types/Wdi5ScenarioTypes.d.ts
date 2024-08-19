import type Opa5 from "sap/ui/test/Opa5";
import type { actions as ListReportActions, assertions as ListReportAssertions } from "sap/fe/test/ListReport";
import type { actions as ObjectPageActions, assertions as ObjectPageAssertions } from "sap/fe/test/ObjectPage";
import type Shell from "sap/fe/test/Shell";

interface When extends Opa5 {
    onTheListReport: Opa5 & ListReportActions
    onTheObjectPage: Opa5 & ObjectPageActions
    onTheShell: Shell
}

interface Then extends Opa5 {
    onTheListReport: Opa5 & ListReportAssertions
    onTheObjectPage: Opa5 & ObjectPageAssertions
    onTheShell: Shell
    iLeaveMyFLPApp: () => void
}

type FioriElementsFacade = {
    execute: (params: (Given: Opa5, When: When, Then: Then) => void) => Promise<void>
}

interface FioriElementsTestBrowser extends WebdriverIO.Browser {
    fe: {
        initialize: (pageDefinitions: PageDefinitions) => Promise<FioriElementsFacade>
    }
}

type PageDefinition = {
    appId: string
    componentId: string
    entitySet: string
}

type PageDefinitions = {
    onTheListReport: {
        ListReport: PageDefinition
    }
    onTheObjectPage: {
        ObjectPage: PageDefinition
    }
    onTheShell: Record<string, unknown>
}
