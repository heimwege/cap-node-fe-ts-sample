# Content

This repo contains a draft enabled [CAP](https://cap.cloud.sap/docs/) (node) based backend that exposes an
OData v4 service used by a TypeScript based [Fiori Elements](https://experience.sap.com/fiori-design-web/smart-templates/)
frontend (List Report and Object Page with a custom section controller extension).

# How to run the app?

- checkout repo
- `npm run install:all`
- `npm run ui:mockserver` (for standalone UI mock server)
- `npm run start` (for integration into CDS server)

# How to run the tests?

### QUnit and OPA5

- `npm run ui:test`
- Test execution report can be found in `./app/samples/target/QunitReport/report.html`
- LCOV coverage report can be found in `./app/samples/target/coverage/lcov-report/index.html`
- Cobertura coverage report can be found in `./app/samples/target/coverage/cobertura-coverage.xml`
- Junit test result report can be found in `./app/samples/target/QunitReport/junit.xml`

### WDI5

- `npm run e2e:test`
- Test execution report can be found in `./app/samples/target/WDI5report/report.html`
- Junit test result report can be found in `./app/samples/target/WDI5report/junit-0-(0|1).xml`

# What does the repo contain?

- Transpile TypeScript sources to JavaScript on browser request ([ui5-tooling-transpile](https://www.npmjs.com/package/ui5-tooling-transpile))
- Integration of UI5 project into CDS server ([cds-plugin-ui5](https://www.npmjs.com/package/cds-plugin-ui5))
- Generate TypeScript types of the service metadata document ([odata2ts](https://www.npmjs.com/package/@odata2ts/odata2ts))
- OData v4 Mockserver to run the UI standalone ([@sap-ux/ui5-middleware-fe-mockserver](https://www.npmjs.com/package/@sap-ux/ui5-middleware-fe-mockserver))
- Generate Sandbox Launchpad to run the UI and tests standalone ([@sap-ux/preview-middleware](https://www.npmjs.com/package/@sap-ux/preview-middleware))
- Unit tests ([QUnit](https://qunitjs.com/))
- Integration tests ([OPA5](https://sapui5.hana.ondemand.com/#/api/sap.ui.test.Opa5), [sap.fe.test](https://sapui5.hana.ondemand.com/sdk/#/api/sap.fe.test))
- Test runner for Unit- and Integration tests including code coverage and test coverage reporting ([ui5-test-runner](https://www.npmjs.com/package/ui5-test-runner))
- End-to-End tests ([WDI5](https://github.com/ui5-community/wdi5), [wdio-timeline-reporter](https://www.npmjs.com/package/wdio-timeline-reporter), [sap.fe.test](https://sapui5.hana.ondemand.com/sdk/#/api/sap.fe.test))
- Static code analysis
  - [eslint](https://www.npmjs.com/package/eslint) ([fiori-tools plugin](https://www.npmjs.com/package/@sap-ux/eslint-plugin-fiori-tools), [ecoCode plugin](https://github.com/green-code-initiative/ecoCode-javascript/tree/main/eslint-plugin), [eslint-formatter-multiple](https://www.npmjs.com/package/eslint-formatter-multiple))
  - [@ui5/linter](https://www.npmjs.com/package/@ui5/linter)

# What does the repo not contain?

As the focus of this repo is on the frontend part there's no real backend implementation.

# UI5 versions 1.122.x and 1.123.x

There's an [issue](https://github.com/SAP/open-ux-tools/issues/1841) with the FLP sandbox launchpad sources from npmjs.
Hence, the launchpad generated by the preview-middleware does not work correctly in these UI5 versions.
As a workaround you can use the [ui5-proxy-middleware](https://www.npmjs.com/package/@sap-ux/ui5-proxy-middleware) to load the ui5 sources directly from the CDN.

# UI5 versions < 1.112.x

In case you use a UI5 version < 1.112.x you need to enable the `overridesToOverride` option (see
[Class Conversion](https://github.com/ui5-community/babel-plugin-transform-modules-ui5#class-conversion) documentation)
in the [.babelrc.json](./app/samples/.babelrc.json) to be able to use the overrides from
[sap.ui.core.mvc.ControllerExtension.override](https://sapui5.hana.ondemand.com/sdk/#/api/sap.ui.core.mvc.ControllerExtension). 

```
["transform-ui5", {
"overridesToOverride": true
}]
```