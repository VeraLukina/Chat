$(function() {
 
    Parse.$ = jQuery;
    Parse.serverURL = 'https://pg-app-b2ytjhkfff1uq7gc4agcly2dqxlrvs.scalabl.cloud/1/';
    //ApplicationID, JavaScriptKey 
    Parse.initialize("uXhZSvLwU0kQbLgZLtQZryYDQneSQNnTPPgGTiNj", "3qTYbEaukt2BwOPrqgN4R4sJ76NPnOQkTGgTSe6Q");
    
    $('.form-signin').on('submit', function(e) {
        alert("hi");
        // Prevent Default Submit Event
        e.preventDefault();
     
        // Get data from the form and put them into variables
        var data = $(this).serializeArray(),
            username = data[0].value,
            password = data[1].value;
     
        // Call Parse Login function with those variables
        Parse.User.logIn(username, password, {
            // If the username and password matches
            success: function(user) {
                window.location.href="dialog_menu.html";
                //alert('Welcome!');
            },
            // If there is an error
            error: function(user, error) {
                console.log(error);
            }
        });
    });
});