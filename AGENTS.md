# AGENTS.md

This file provides guidance for AI coding agents (like Claude Code, GitHub Copilot, Cursor, etc.) working with this repository.

## Project Overview

This is a **SAP CAP (Cloud Application Programming Model) Node.js backend** with a **TypeScript-based SAP Fiori Elements frontend** sample application. The project demonstrates a draft-enabled OData v4 service consumed by a Fiori Elements List Report and Object Page with custom controller extensions.

**Key Technologies:**
- Backend: SAP CAP (Node.js), OData v4, SQLite
- Frontend: SAP UI5/Fiori Elements, TypeScript
- Testing: QUnit, OPA5, WDI5 (E2E)
- Tooling: UI5 Tooling, ESLint, Babel

## Project Structure

```
cap-node-fe-ts-sample/
├── app/                          # Frontend applications
│   ├── index.cds                 # App configuration
│   └── samples/                  # Sample Fiori Elements app
│       ├── webapp/               # UI5 application sources
│       ├── ui-annotations.cds    # UI annotations
│       ├── ui5.yaml              # UI5 tooling configuration
│       └── odata2ts.config.ts    # TypeScript type generation config
├── db/                           # Database layer
│   └── data-model.cds           # Data model definitions
├── srv/                          # Service layer
│   └── cap-fe-ts-sample-service.cds  # Service definitions
└── package.json                  # Root package configuration
```

## Important Commands

### Development
- `npm start` - Start CDS server with UI5 app integrated
- `npm run ui:mockserver` - Run UI standalone with mock server
- `npm run ui:mockserver:proxy` - Run UI mock server with UI5 sources from CDN
- `npm run ui:cap` - Run UI with CDS server integrated
- `npm run build:cds` - Build CDS model and generate TypeScript types

### Testing
- `npm run ui:test` - Run QUnit and OPA5 tests (unit + integration)
- `npm run e2e:test` - Run WDI5 end-to-end tests

## Key Features & Capabilities

1. **TypeScript Frontend**: Full TypeScript support with type generation from OData metadata via `odata2ts`
2. **Draft Support**: The backend service is draft-enabled for Fiori Elements
3. **Controller Extensions**: Custom controller extensions in TypeScript (see BaseControllerExtension pattern)
4. **Test Coverage**: Comprehensive testing setup with unit, integration, and E2E tests
5. **UI5 Tooling Middlewares**:
   - `ui5-tooling-transpile` - Transpiles TypeScript on-the-fly during development
   - `@sap-ux/ui5-middleware-fe-mockserver` - Standalone mock server with custom enhancements
   - `cds-plugin-ui5` - Integrates UI5 server into CDS server

## Coding Guidelines

### Backend (CAP/CDS)

1. **CDS Models**: Follow CAP best practices
   - Define entities in `db/data-model.cds`
   - Define services in `srv/*.cds`
   - Use annotations for UI in `app/**/ui-annotations.cds`

2. **No Backend Implementation**: This repo focuses on frontend; backend has minimal logic

### Frontend (TypeScript/UI5)

1. **TypeScript**: All UI5 code should be in TypeScript
   - Use strict type checking
   - Generate types from OData metadata: `npm --prefix app/samples run odata:types:generate`

2. **Controller Extensions**:
   - Use `sap.fe.core.controllerextensions.BaseControllerExtension` for controller extensions
   - Place custom logic in controller extensions, not in freestyle controllers

3. **UI5 Version Compatibility**:
   - Target UI5 version: >= 1.112.x
   - For UI5 1.122.x and 1.123.x: FLP sandbox has known issues; use ui5-proxy-middleware as workaround
   - For UI5 < 1.112.x: Enable `overridesToOverride` in `.babelrc.json`

4. **Babel Configuration**:
   - Located in `app/samples/.babelrc.json`
   - Uses `babel-plugin-transform-modules-ui5` for ES6 module to UI5 AMD conversion

5. **ESLint**:
   - Configuration at root level as ESM (`.mjs`)
   - Uses `@sap-ux/eslint-plugin-fiori-tools`
   - Linting also done with `@ui5/linter`

### Testing

1. **Unit Tests (QUnit)**:
   - Place in `app/samples/webapp/test/unit/`
   - Test individual controllers, formatters, utilities

2. **Integration Tests (OPA5)**:
   - Place in `app/samples/webapp/test/integration/`
   - Use `sap.fe.test` APIs for Fiori Elements testing

3. **E2E Tests (WDI5)**:
   - Configuration in `app/samples/wdio.conf.ts`
   - Tests are WebdriverIO-based with UI5 support

4. **Test Execution**:
   - Uses `ui5-test-runner` with coverage reporting
   - Reports generated in `app/samples/target/`

## Common Tasks

### Adding a New Entity

1. Define entity in `db/data-model.cds`
2. Expose in service `srv/cap-fe-ts-sample-service.cds`
3. Add UI annotations in `app/samples/ui-annotations.cds`
4. Run `npm run build:cds` to generate TypeScript types
5. Update mock data if using standalone mockserver

### Modifying UI Annotations

1. Edit `app/samples/ui-annotations.cds`
2. Annotations are automatically picked up by Fiori Elements
3. Test changes with `npm start` or `npm run ui:mockserver:proxy`

### Adding Custom Logic to Controller

1. Create/modify controller extension in `app/samples/webapp/ext/`
2. Use TypeScript with proper UI5 imports
3. Reference extension in manifest.json under `extends.extensions`
4. Add unit tests for custom logic

### Updating TypeScript Types from OData Metadata

```bash
npm run build:cds
```

This regenerates types in `app/samples/webapp/ext/types/gen` based on the service metadata.

## Architecture Decisions

1. **TypeScript Over JavaScript**: All frontend code uses TypeScript for type safety
2. **Fiori Elements Over Freestyle**: Uses Fiori Elements patterns with controller extensions
3. **No Backend Logic**: Backend is intentionally minimal; focus is on frontend patterns
4. **UI5 Tooling**: Uses standard UI5 tooling with middlewares for development workflow
5. **Workspaces**: npm workspaces used for monorepo structure (`app/*`)

## Known Issues & Workarounds

1. **FLP Sandbox Issues (UI5 1.122.x, 1.123.x)**:
   - Problem: FLP sandbox from npmjs doesn't work correctly
   - Workaround: Use `ui5-proxy-middleware` to load UI5 from CDN
   - Commands: `npm run ui:mockserver:proxy` or `npm run ui:mockserver:proxy:rta`

2. **UI5 < 1.112.x Compatibility**:
   - Requires `overridesToOverride: true` in `.babelrc.json` for controller overrides

## Development Workflow

1. **Initial Setup**:
   ```bash
   npm run install
   ```

2. **Development with Live Reload**:
   ```bash
   npm start
   ```

3. **Standalone Frontend Development**:
   ```bash
   npm run ui:mockserver:proxy
   ```

4. **Before Committing**:
   - Run tests: `npm run ui:test`
   - Check for linting errors
   - Ensure TypeScript types are up to date

## Runtime Adaptation (Flexibility/RTA)

- RTA endpoint available via `npm run ui:mockserver:proxy:rta`
- Changes are saved as `.changes` files
- UI5 builder task `generateFlexChangesBundle` bundles changes into `flexibility-bundle.json`
- Changes are applied at runtime when deployed

## File Naming Conventions

- **CDS files**: kebab-case (e.g., `data-model.cds`, `cap-fe-ts-sample-service.cds`)
- **TypeScript files**: PascalCase for classes/components (e.g., `Component.ts`), camelCase for utilities
- **UI5 YAML**: kebab-case (e.g., `ui5-local.yaml`, `ui5-with-cap.yaml`)

## Dependencies Management

- **Root level**: CAP dependencies and dev tooling
- **App level**: UI5 dependencies and frontend tooling
- **Workspaces**: Defined in root `package.json` for `app/*`

### ⚠️ IMPORTANT: UI5-Related Type Packages

**DO NOT UPDATE** the following packages independently - they are tied to the specific UI5 version in use:
- `@sapui5/types` - Must match the UI5 framework version
- `@types/qunit` - Must be compatible with the UI5 QUnit version
- `@types/sinon` - Must be compatible with the UI5 Sinon version

These type packages should only be updated when upgrading the UI5 framework version itself. Updating them standalone can cause type incompatibilities and breaking changes.

## Agent-Specific Tips

1. **Read Before Modifying**: Always read CDS files and manifest.json before suggesting changes
2. **Type Generation**: Remember to regenerate types after modifying CDS models
3. **Testing**: After code changes, suggest running appropriate tests
4. **UI5 Conventions**: Follow SAP UI5 and Fiori Elements conventions strictly
5. **TypeScript**: Leverage TypeScript features; avoid `any` types
6. **Annotations**: UI behavior is driven by annotations; check `ui-annotations.cds` first
7. **Mock Data**:
   - Frontend mock data (for standalone UI): `app/samples/webapp/localService/mockdata/`
   - CAP backend mock data (for integrated mode): `db/data/*.csv`

## Resources

- SAP CAP Documentation (Capire): https://capire.cloud.sap/
- SAP UI5 SDK: https://ui5.sap.com/
- SAP Fiori Development Portal: https://ui5.sap.com/test-resources/sap/fe/core/fpmExplorer/index.html
- SAP Fiori Tools: https://help.sap.com/docs/SAP_FIORI_tools
- UI5 Tooling: https://sap.github.io/ui5-tooling/
- Repository: https://github.com/heimwege/cap-node-fe-ts-sample

## Questions or Issues?

- Check the README.md for basic setup and usage
- Review existing code patterns before implementing new features
- Follow SAP's official documentation for CAP, UI5 and Fiori elements
- Ensure changes maintain the TypeScript-first approach of this project
