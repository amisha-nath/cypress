const { defineConfig } = require('cypress');
module.exports = defineConfig({
e2e: {
baseUrl: 'https://opensource-demo.orangehrmlive.com',
setupNodeEvents(on, config) {
require('cypress-mochawesome-reporter/plugin')(on);
},
},
screenshotOnRunFailure: true, // Auto-screenshot on test failure
screenshotsFolder: 'cypress/screenshots', // Screenshots save location
video: true, // Record videos
videoUploadOnPasses: false, // Don't upload videos of passing tests
videosFolder: 'cypress/videos', // Videos save location
viewportWidth: 1280, // Set video dimensions
viewportHeight: 720,
reporter: 'cypress-mochawesome-reporter',
reporterOptions: {
reportDir: 'cypress/reports',
overwrite: false,
html: true,
json: true,
charts: true,
reportPageTitle: 'OrangeHRM Test Report',
embeddedScreenshots: true,
inlineAssets: true,
},
});