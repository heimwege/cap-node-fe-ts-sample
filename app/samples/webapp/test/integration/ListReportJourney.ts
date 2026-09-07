import opaTest from 'sap/ui/test/opaQunit';
import type { Given, When, Then } from 'com/sap/cap/fe/ts/sample/test/integration/types/OpaJourneyTypes';
import runner from './pages/JourneyRunner';

// Currently open type errors:
// - sap.fe.test onTable "vTableIdentifier" should be optional

function journey() {
    // there should be no blanks in Qunit module name in case of a piper based traceability mapping
    QUnit.module('ListReport');

    opaTest('Should see entries in the table', function (Given: Given, When: When, Then: Then) {
        Given.iResetMockData({ ServiceUri: '/odata/v4/CapFeTsSampleService/' });
        Given.iResetTestData();
        Given.iStartMyApp('Samples-display', {
            'sap-ui-xx-viewCache': false,
            'sap-ui-language': 'en'
        });

        Then.onTheListReport.onTable('').iCheckRows(undefined, 3);
    });

    opaTest('Should see the filter bar', function (Given: Given, When: When, Then: Then) {
        Then.onTheListReport.onFilterBar().iCheckFilterField({ property: 'name' });
    });

    opaTest('Should be able to adapt filters', function (Given: Given, When: When, Then: Then) {
        When.onTheListReport.onFilterBar().iOpenFilterAdaptation();

        Then.onTheListReport.onFilterBar()
            .iCheckAdaptationFilterField({ property: 'modifiedBy' }, { selected: false })
            .and.iCheckAdaptationFilterField({ property: 'modifiedAt' }, { selected: false })
            .and.iCheckAdaptationFilterField({ property: 'createdBy' }, { selected: false })
            .and.iCheckAdaptationFilterField({ property: 'createdAt' }, { selected: false })
            .and.iConfirmFilterAdaptation();
    });

    opaTest('Should be able to create and delete samples', function (Given: Given, When: When, Then: Then) {
        Then.onTheListReport.onTable('').iCheckCreate({ visible: true }).and.iCheckDelete({ visible: true });
    });

    opaTest('Should be able to filter', function (Given: Given, When: When, Then: Then) {
        When.onTheListReport.onFilterBar().iChangeFilterField({ property: 'name' }, 'Test', true).and.iExecuteSearch();

        Then.onTheListReport.onTable('').iCheckRows(undefined, 1);
    });

    opaTest('Should be able to remove a filter', function (Given: Given, When: When, Then: Then) {
        When.onTheListReport.onFilterBar().iChangeFilterField({ property: 'name' }, '', true).and.iExecuteSearch();

        Then.onTheListReport.onTable('').iCheckRows(undefined, 3);
    });

    opaTest('I tear down the app', function (Given: Given) {
        // Cleanup
        Given.iTearDownMyApp();
    });
}

runner.run([journey]);
