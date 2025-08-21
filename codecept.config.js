exports.config = {
  // Define the testing environment and helper
  helpers: {
    // Use Playwright as the browser automation helper
    Playwright: {
      // Base URL for the application under test
      url: "https://demo.realworld.show/",
      // Specify the browser to use. You can use 'chromium', 'firefox', or 'webkit'.
      browser: "chromium",
      // Set to 'true' to show the browser window during test execution
      show: true,
      // Define global timeout for actions in milliseconds
      waitForTimeout: 5000,
      // Wait for a navigation event to consider a page loaded
      waitForNavigation: "domcontentloaded",
      // Set the window size for desktop view
      fullPageScreenshots: true,
    },
  },
  // Define the directory where test files are located
  // Test files should end with _test.js
  tests: "./*_test.js",
  // Define the output directory for reports, screenshots, etc.
  output: "./output",
  // Configure test features and scenarios
  mocha: {},
  // Define plugins for CodeceptJS, such as custom reporters or hooks
  bootstrap: null,
  teardown: null,
  plugins: {
    // This plugin will automatically retry failed tests
    retryFailedStep: {
      enabled: true,
    },
    // This plugin will save a screenshot of the page on test failure
    screenshotOnFail: {
      enabled: true,
    },
  },
  // Set the name of the project
  name: "realworld-test-framework",
};
