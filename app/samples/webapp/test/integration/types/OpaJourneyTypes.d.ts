import type Opa5 from "sap/ui/test/Opa5";
import type { actions as ListReportActions, assertions as ListReportAssertions } from "sap/fe/test/ListReport";
import type { actions as ObjectPageActions, assertions as ObjectPageAssertions } from "sap/fe/test/ObjectPage";
import type { actions as CustomObjectPageActions, assertions as CustomObjectPageAssertions } from "com/sap/cap/fe/ts/sample/test/integration/pages/ObjectPage";
import type { assertions as CustomListReportAssertions } from "com/sap/cap/fe/ts/sample/test/integration/pages/ListReport";
import type {actions as TemplatePageActions, assertions as TemplatePageAssertions} from "sap/fe/test/TemplatePage";
import type Shell from "sap/fe/test/Shell";
import type BaseArrangements from "sap/fe/test/BaseArrangements";

type ExperimentalObjectPageAssertions = {
    iSeeLinkWithText: (text: string) => void
    iSeeContactDetailsPopover: (text: string) => void
}

type ExperimentalObjectPageActions = {
    iClickLinkWithText: (text: string) => void
}

type Given = Opa5 & BaseArrangements & {
    iTearDownMyApp: () => Given
    iStartMyApp: (sAppHash: string, mInUrlParameters?: object) => Given
    and: Given
}

type When = Opa5 & BaseArrangements & {
    onTheListReport: Opa5 & ListReportActions & TemplatePageActions
    onTheObjectPage: Opa5 & ObjectPageActions & TemplatePageActions & typeof CustomObjectPageActions & ExperimentalObjectPageActions
    onTheShell: Shell
}

type Then = Opa5 & BaseArrangements & {
    onTheListReport: Opa5 & ListReportAssertions & TemplatePageAssertions & typeof CustomListReportAssertions
    onTheObjectPage: Opa5 & ObjectPageAssertions & TemplatePageAssertions & typeof CustomObjectPageAssertions & ExperimentalObjectPageAssertions
    onTheShell: Shell
}
