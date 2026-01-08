import type { wdi5Config } from "wdio-ui5-service";
// @ts-expect-error: JSONReporter is not typed
import { JSONReporter, HTMLReportGenerator } from 'wdio-json-html-reporter';
import { join } from "node:path";

function getBrowserArgs () {
    if (process.argv.includes("--ci")) {
        return ["--disable-gpu", "--disable-dev-shm-usage", "--headless", "--window-size=1440,800", "--disable-software-rasterizer"];
    }
    if (process.argv.includes("--headless")) {
        return ["--headless", "--window-size=1440,800"];
    }
    if (process.argv.includes("--debug")) {
        return ["--window-size=1440,800", "--auto-open-devtools-for-tabs", "--disable-search-engine-choice-screen"];
    }
    return ["--window-size=1440,800", "--disable-search-engine-choice-screen"];
}

function getTimeout () {
    return process.argv.includes("--debug") ? 1200000 : 120000;
}

export const config: wdi5Config = {
    wdi5: {
        screenshotPath: join("./target/WDI5report/", "screenshots"),
        screenshotsDisabled: false,
        logLevel: "error", // error | verbose | silent
        waitForUI5Timeout: 30000
    },
    //baseUrl must provide the 'sap-ui-xx-viewCache' URL parameter to avoid redirect from preview middleware
    baseUrl: "http://localhost:8080/localService/index.html?sap-ui-xx-viewCache=true",
    specs: ["./scenarios/*.test.ts"],
    maxInstances: 2,
    capabilities: [
        {
            browserName: "chrome",
            "goog:chromeOptions": {
                args: getBrowserArgs()
            },
            acceptInsecureCerts: true
            // authentication based on https://ui5-community.github.io/wdi5/#/authentication
        }
    ],
    logLevel: "warn",
    bail: 0,
    waitforTimeout: 30000,
    connectionRetryTimeout: getTimeout(),
    connectionRetryCount: 3,
    services: ["ui5"],
    reporters: [
        "spec",
        ["junit", {
            outputDir: "./target/WDI5report/",
            outputFileFormat: function (options) {
                return `junit-${options.cid}.xml`;
            },
            packageName: "wdi5"
        }],
        [JSONReporter, { outputFile: './target/WDI5report/test-results.json', screenshotOption: 'Full' }],  // Options: "No", "OnFailure", "Full"
    ],
    framework: "mocha",
    mochaOpts: {
        ui: "bdd",
        timeout: getTimeout()
    },
    //
    // =====
    // Hooks
    // =====
    // WebdriverIO provides several hooks you can use to interfere with the test process in order to enhance
    // it and to build services around it. You can either apply a single function or an array of
    // methods to it. If one of them returns with a promise, WebdriverIO will wait until that promise got
    // resolved to continue.
    /**
     * Gets executed once before all workers get launched.
     * @param {Object} config wdio configuration object
     * @param {Array.<Object>} capabilities list of capabilities details
     */
    // onPrepare: function (config, capabilities) {
    // },
    /**
     * Gets executed before a worker process is spawned and can be used to initialise specific service
     * for that worker as well as modify runtime environments in an async fashion.
     * @param  {String} cid      capability id (e.g 0-0)
     * @param  {[type]} caps     object containing capabilities for session that will be spawn in the worker
     * @param  {[type]} specs    specs to be run in the worker process
     * @param  {[type]} args     object that will be merged with the main configuration once worker is initialized
     * @param  {[type]} execArgv list of string arguments passed to the worker process
     */
    // onWorkerStart: function (cid, caps, specs, args, execArgv) {
    // },
    /**
     * Gets executed just after a worker process has exited.
     * @param  {String} cid      capability id (e.g 0-0)
     * @param  {Number} exitCode 0 - success, 1 - fail
     * @param  {[type]} specs    specs to be run in the worker process
     * @param  {Number} retries  number of retries used
     */
    // onWorkerEnd: function (cid, exitCode, specs, retries) {
    // },
    /**
     * Gets executed just before initialising the webdriver session and test framework. It allows you
     * to manipulate configurations depending on the capability or spec.
     * @param {Object} config wdio configuration object
     * @param {Array.<Object>} capabilities list of capabilities details
     * @param {Array.<String>} specs List of spec file paths that are to be run
     * @param {String} cid worker id (e.g. 0-0)
     */
    // beforeSession: function (config, capabilities, specs, cid) {
    // },
    /**
     * Gets executed before test execution begins. At this point you can access to all global
     * variables like `browser`. It is the perfect place to define custom commands.
     * @param {Array.<Object>} capabilities list of capabilities details
     * @param {Array.<String>} specs        List of spec file paths that are to be run
     * @param {Object}         browser      instance of created browser/device session
     */
    // before: function (capabilities, specs) {
    // },
    /**
     * Runs before a WebdriverIO command gets executed.
     * @param {String} commandName hook command name
     * @param {Array} args arguments that command would receive
     */
    // beforeCommand: function (commandName, args) {
    // },
    /**
     * Hook that gets executed before the suite starts
     * @param {Object} suite suite details
     */
    // beforeSuite: function (suite) {
    // },
    /**
     * Function to be executed before a test (in Mocha/Jasmine) starts.
     */
    // beforeTest: function (test, context) {
    // },
    /**
     * Hook that gets executed _before_ a hook within the suite starts (e.g. runs before calling
     * beforeEach in Mocha)
     */
    // beforeHook: function (test, context) {
    // },
    /**
     * Hook that gets executed _after_ a hook within the suite starts (e.g. runs after calling
     * afterEach in Mocha)
     */
    // afterHook: function (test, context, { error, result, duration, passed, retries }) {
    // },
    /**
     * Function to be executed after a test (in Mocha/Jasmine only)
     * @param {Object}  test             test object
     * @param {Object}  context          scope object the test was executed with
     * @param {Error}   result.error     error object in case the test fails, otherwise `undefined`
     * @param {Any}     result.result    return object of test function
     * @param {Number}  result.duration  duration of test
     * @param {Boolean} result.passed    true if test has passed, otherwise false
     * @param {Object}  result.retries   informations to spec related retries, e.g. `{ attempts: 0, limit: 0 }`
     */
    // afterTest: function(test, context, { error, result, duration, passed, retries }) {
    // },

    /**
     * Hook that gets executed after the suite has ended
     * @param {Object} suite suite details
     */
    // afterSuite: function (suite) {
    // },
    /**
     * Runs after a WebdriverIO command gets executed
     * @param {String} commandName hook command name
     * @param {Array} args arguments that command would receive
     * @param {Number} result 0 - command success, 1 - command error
     * @param {Object} error error object if any
     */
    // afterCommand: function (commandName, args, result, error) {
    // },
    /**
     * Gets executed after all tests are done. You still have access to all global variables from
     * the test.
     * @param {Number} result 0 - test pass, 1 - test fail
     * @param {Array.<Object>} capabilities list of capabilities details
     * @param {Array.<String>} specs List of spec file paths that ran
     */
    // after: function (result, capabilities, specs) {
    // },
    /**
     * Gets executed right after terminating the webdriver session.
     * @param {Object} config wdio configuration object
     * @param {Array.<Object>} capabilities list of capabilities details
     * @param {Array.<String>} specs List of spec file paths that ran
     */
    // afterSession: function (config, capabilities, specs) {
    // },
    /**
     * Gets executed after all workers got shut down and the process is about to exit. An error
     * thrown in the onComplete hook will result in the test run failing.
     * @param {Object} exitCode 0 - success, 1 - fail
     * @param {Object} config wdio configuration object
     * @param {Array.<Object>} capabilities list of capabilities details
     * @param {<Object>} results object containing test results
     */
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    onComplete: async function(exitCode, config, capabilities, results) {
        const outputFilePath = './target/WDI5report/test-report.html';
        const jsonFolder = './target/WDI5report/'; // Directory where JSON reports are saved

        // If you want to include historical data, specify the history JSON file path here.
        const historyFile = './target/WDI5report/history.json'; // Optional

        // Optionally, generate aggregated history data before generating the HTML report.
        // JSONReporter.generateAggregateHistory({ reportPaths: jsonFolder, historyPath: historyFile });

        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-call
        const reportGenerator = new HTMLReportGenerator(outputFilePath, historyFile);
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
        await reportGenerator.convertJSONFolderToHTML(jsonFolder);
    }
    /**
     * Gets executed when a refresh happens.
     * @param {String} oldSessionId session ID of the old session
     * @param {String} newSessionId session ID of the new session
     */
    // onReload: function(oldSessionId, newSessionId) {
    // }
};
