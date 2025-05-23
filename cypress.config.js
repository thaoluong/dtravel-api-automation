const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: "https://api.dataismist.com",
    specPattern: "cypress/dtravel-apis/Setting-apis/**.*",
    reporter: "mochawesome",
    reporterOptions: {
      reportDir: "test-result",
      overwrite: false,
      html: true,
      json: true,
      colorize: true
    }
  },
});
