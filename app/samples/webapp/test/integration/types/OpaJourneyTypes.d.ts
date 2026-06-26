import type Opa5 from 'sap/ui/test/Opa5';
import type { actions as ListReportActions, assertions as ListReportAssertions } from 'sap/fe/test/ListReport';
import type { actions as ObjectPageActions, assertions as ObjectPageAssertions } from 'sap/fe/test/ObjectPage';
import type {
    actions as CustomObjectPageActions,
    assertions as CustomObjectPageAssertions
} from 'com/sap/cap/fe/ts/sample/test/integration/pages/ObjectPage';
import type { assertions as CustomListReportAssertions } from 'com/sap/cap/fe/ts/sample/test/integration/pages/ListReport';
import type { actions as TemplatePageActions, assertions as TemplatePageAssertions } from 'sap/fe/test/TemplatePage';
import type Shell from 'sap/fe/test/Shell';
import type BaseArrangements from 'sap/fe/test/BaseArrangements';

/**
 * Enables OPA5 fluent `.and` chaining on page objects and their sub-objects.
 *
 * @example
 * Then.onTheObjectPage.iShouldSeeSection('A').and.iShouldSeeSection('B');
 * When.onTheObjectPage.onFooter().iExecuteCancel().and.iConfirmCancel();
 * When.onTheListReport.onTable('').iPressRow({}).and.iDoOther();
 */
type WithAnd<T> = {
    [K in keyof T | 'and']: K extends 'and'
        ? WithAnd<T>
        : K extends keyof T
        ? T[K] extends (...args: infer A) => infer R
            ? (...args: A) => (R extends Opa5 | object ? (keyof R extends never ? WithAnd<T> : [R] extends [Opa5] ? WithAnd<T> : WithAnd<R>) : WithAnd<T>)
            : T[K]
        : never;
};

type ExperimentalObjectPageAssertions = {
    iSeeLinkWithText: (text: string) => void;
    iSeeContactDetailsPopover: (text: string) => void;
};

type ExperimentalObjectPageActions = {
    iClickLinkWithText: (text: string) => void;
};

type Given = Opa5 &
    BaseArrangements & {
        iTearDownMyApp: () => Given;
        iStartMyApp: (sAppHash: string, mInUrlParameters?: object) => Given;
        and: Given;
    };

type When = Opa5 &
    BaseArrangements & {
        onTheListReport: WithAnd<Opa5 & ListReportActions & TemplatePageActions>;
        onTheObjectPage: WithAnd<
            Opa5 &
                ObjectPageActions &
                TemplatePageActions &
                typeof CustomObjectPageActions &
                ExperimentalObjectPageActions
        >;
        onTheShell: Shell;
    };

type Then = Opa5 &
    BaseArrangements & {
        onTheListReport: WithAnd<Opa5 & ListReportAssertions & TemplatePageAssertions & typeof CustomListReportAssertions>;
        onTheObjectPage: WithAnd<
            Opa5 &
                ObjectPageAssertions &
                TemplatePageAssertions &
                typeof CustomObjectPageAssertions &
                ExperimentalObjectPageAssertions
        >;
        onTheShell: Shell;
    };
