const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
  
    reporter: 'mochawesome',
    reporterOptions: {
      reportDir: 'cypress/reports',
      overwrite: false,
      html: true,
      json: true,
      charts: true,
      reportPageTitle: 'OrangeHRM Test Report',
      embeddedScreenshots: true,
      inlineAssets: true,
      saveAllAttempts:false,
  },
    // baseUrl: 'https://opensource-demo.orangehrmlive.com',
    // setupNodeEvents(on, config) {
    //   require('cypress-mochawesome-reporter/plugin')(on);
    // },
  },
  screenshotOnRunFailure: true,
  screenshotsFolder: 'cypress/screenshots',
  video: true,
  videosFolder: 'cypress/videos',
  viewportWidth: 1280,
  viewportHeight: 720,
  
});
