exports.config = {

  baseUrl: "http://preview:myproject@abby-finn-website-build.approvemyviews.com/",
  directConnect: true,

  capabilities: {
    'browserName': 'chrome'
  },

  framework: 'jasmine',

  specs: ['specs/*loginSpec.js'],

  jasmineNodeOpts: {
    defaultTimeoutInterval: 90000
  },
  
  jasmineNodeOpts: {
    showColors: true,
    displaySpecDuration: true,
    // overrides jasmine's print method to report dot syntax for custom reports
    print: () => {},
    defaultTimeoutInterval: 50000
},

  onPrepare: function() {
    protractor.basePath = __dirname;
  }
};