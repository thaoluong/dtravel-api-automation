const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: "https://api.dataismist.com/listing-service/v1",
    specPattern: "cypress/dtravel-apis/**.*",
    reporter: "mochawesome",
  },
});
