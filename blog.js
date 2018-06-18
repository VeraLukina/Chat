$(function() {
 
    Parse.$ = jQuery;
    Parse.serverURL="https://pg-app-b2ytjhkfff1uq7gc4agcly2dqxlrvs.scalabl.cloud/1/";
    //ApplicationID, JavaScriptKey 
    Parse.initialize("uXhZSvLwU0kQbLgZLtQZryYDQneSQNnTPPgGTiNj", "3qTYbEaukt2BwOPrqgN4R4sJ76NPnOQkTGgTSe6Q");

    var TestObject = Parse.Object.extend("TestObject");
    var testObject = new TestObject();
    testObject.save({foo: "bar"}).then(function(object) {
      alert("yay! it worked");
    });
 
});