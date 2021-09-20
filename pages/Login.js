const { browser, $, element } = require("protractor");
var path = require('path');

var LoginPage = function() {
  var str;
  var EC = protractor.ExpectedConditions;
	var elm = element.all(by.xpath("//li[contains(@class,'ac_')]"));
  var image_banner = element.all(by.xpath("//img[@itemprop='image']"));
  var addtocart = element.all(by.xpath("//a[@class='button ajax_add_to_cart_button btn btn-default' and //span[contains(.,'Add to cart')]]"))
  var cross = element(by.xpath("//span[contains(@class,'cross')]"));
  var itemPrice = element.all(by.xpath("//div[@class='left-block'and //span[@itemprop='price']]"));
  var search = element(by.id('search_query_top'));
  var search_list = element(by.css('ac_results'));
  var Tshirt =element(by.xpath(("(//a[@href='http://automationpractice.com/index.php?id_category=5&controller=category'][contains(.,'T-shirts')])[2]")));
  var LargeSizeCheckbox=element(by.css('input#layered_id_attribute_group_3'));
  var ContactUs = element(by.xpath("//a[@title='Contact Us']"));

  this.get = function() {
    browser.waitForAngularEnabled(false);
    browser.manage().timeouts().implicitlyWait(7000);
    browser.get('http://automationpractice.com/index.php');
    browser.manage().window().maximize();
  };

  this.searchResultTest=function(text){
    str = text;
    for (var i = 0; i < str.length; i++) {
      //console.log(text.charAt(i));
      var char_sequence = str.charAt(i); 
      search.sendKeys(char_sequence);
      if(i<2)
      { 
        browser.wait(EC.invisibilityOf(elm), 5000);
      }
      else
      {
     element.all(by.xpath("//li[contains(@class,'ac_')]")).filter(function(elem, index) {
      return elem.getText().then(function(text) {
        return text.includes(str);
      });
      }).then(function(Arr_Finder) {
        for(let i = 0; i< Arr_Finder.length; i++) {
          //browser.wait(EC.textToBePresentInElementValue((Arr_Finder[i].getText()), str), 5000);
          expect(Arr_Finder[i].getText()).toContain(str);
        }

      });

      }//end else
    }
  }
  
  this.checkLSizeFilter=function(){
    browser.wait(EC.elementToBeClickable(Tshirt), 5000);
    expect(Tshirt.isDisplayed()).toBe(true);
    Tshirt.click();
   // browser.wait(EC.visibilityOf(LargeSizeCheckbox),10000)expect(foo.isSelected()).toBe(false);
   expect(LargeSizeCheckbox.isSelected()).toBe(false);
   LargeSizeCheckbox.click();
   expect(LargeSizeCheckbox.isSelected()).toBe(true);
   
  }

  this.Contact_Upload_Test=function()
  {
    browser.wait(EC.elementToBeClickable(ContactUs), 5000);
    expect(ContactUs.isDisplayed()).toBe(true);
    ContactUs.click();
    var fileToUpload = '../sample.txt';
    var absolutePath = path.resolve(__dirname, fileToUpload);
    $('input[type="file"]').sendKeys(absolutePath);    
    browser.sleep(5000);
  }

  this.CheckAddToCart=function(){
          addtocart.then(function(items) {
            for(var i=0;i<5;i++){
              
              browser.actions().mouseMove(ele).perform();
              ele.click();
            }
          });
  }//Function end*/


};

module.exports = new LoginPage();
