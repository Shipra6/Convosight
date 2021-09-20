let SpecReporter = require('jasmine-spec-reporter').SpecReporter;
// Config file
exports.config = {
  seleniumAddress: 'http://localhost:4444/wd/hub',
  // 3. sauceUser/sauceKey - to use remote Selenium servers via SauceLabs.
  // The location of the selenium standalone server .jar file.
  seleniumPort: null,
  
  // Chromedriver location is used to help the selenium standalone server
  // find chromedriver. This will be passed to the selenium jar as
  // the system property webdriver.chrome.driver. If null, selenium will
  // attempt to find chromedriver using PATH.
  
  //geckoDriver: '/usr/lib/node_modules/protractor/node_modules/webdriver-manager/selenium/geckodriver-v0.20.1',

  // Additional command line options to pass to selenium. For example,
  // if you need to change the browser timeout, use
  // seleniumArgs: ['-browserTimeout=60'],
  
  seleniumArgs: [],
  
  // If sauceUser and sauceKey are specified, seleniumServerJar will be ignored.
  // The tests will be run remotely using SauceLabs.
  
  sauceUser: null,
  sauceKey: null,

   
  // ----- What tests to run -----
  // Spec patterns are relative to the location of this config.
  
   specs: [
     './tests/LoginTestWithJsonData.js'
   ],
//getPageTimeout: 30000,

suites:{

  UsingJsonDataProvider: './tests/LoginTestWithJsonData.js',

},

  directConnect: true,

  // Capabilities to be passed to the webdriver instance.
  capabilities: {
    'browserName': 'chrome'
  },

  

  // Selector for the element housing the angular app - this defaults to
  // body, but is necessary if ng-app is on a descendant of <body>  
  
  rootElement: 'body',
  framework: 'jasmine',

  onPrepare: function() {
  
	  jasmine.getEnv().addReporter(new SpecReporter({
	      displayFailuresSummary: true,
	      displayFailuredSpec: false,
	      displaySuiteNumber: true,
	      displaySpecDuration: true
	    }));
        
    // Add a screenshot reporter:
      var AllureReporter = require('jasmine-allure-reporter');
	  jasmine.getEnv().addReporter(new AllureReporter({
	      resultsDir: 'allure-results'
      }));
    
	  jasmine.getEnv().afterEach(function(done){
      browser.takeScreenshot().then(function (png) {
        allure.createAttachment('Screenshot', function () {
          return new Buffer(png, 'base64')
        }, 'image/png')();
        done();
      })
    }); 
  },
  

  // ----- Options to be passed to minijasminenode -----
  
  jasmineNodeOpts: {
  
    // onComplete will be called just before the driver quits.
    onComplete: null,
    // If true, display spec names.
    isVerbose: true,
    // If true, print colors to the terminal.
    showColors: true,
    // If true, include stack traces in failures.
    includeStackTrace: false,
    // Default time to wait in ms before a test fails.
    defaultTimeoutInterval: 2500000
  }

 
};
