const { browser } = require('protractor');
var LoginObj = require('../pages/Login.js');
var LoginData = require('../testdata/LoginData.json');

describe('Convosight UI Validation, ', function() {
it('Validate search suggestion is not given to user until 3 char are populated.& Validate results are displayed according the search made by user.', function() {
LoginObj.get();
LoginObj.searchResultTest("Dre");


}) 
it('Validate user is able to apply the large size catalouge filter for T-shirt section.', function() {
    LoginObj.get();
    LoginObj.checkLSizeFilter();
})

it('Validate user is able to upload a file on contact us page.', function() {
    LoginObj.get();
    LoginObj.Contact_Upload_Test();  
})

it('Add 5 products in the cart. Validate total cart amount and individual product price both with and without discount.',function(){
    //LoginObj.get();
    //LoginObj.CheckAddToCart();  
})
  
});

afterEach(function() {
    // Logout
 //   browser.quit();
  });
