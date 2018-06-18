$(function () {

    Parse.$ = jQuery;
    Parse.serverURL = 'https://pg-app-b2ytjhkfff1uq7gc4agcly2dqxlrvs.scalabl.cloud/1/';
    //ApplicationID, JavaScriptKey 
    Parse.initialize("uXhZSvLwU0kQbLgZLtQZryYDQneSQNnTPPgGTiNj", "3qTYbEaukt2BwOPrqgN4R4sJ76NPnOQkTGgTSe6Q");

    function parseUrlQuery() {
        var data = {};
        if (location.search) {
            var pair = (location.search.substr(1)).split('&');
            for (var i = 0; i < pair.length; i++) {
                var param = pair[i].split('=');
                data[param[0]] = param[1];
            }
        }
        return data;
    }

    

    adress = parseUrlQuery()['Adresse']

    Parse.User.enableUnsafeCurrentUser()
    var currentUser = Parse.User.current();

    document.getElementById("username").innerText = Parse.User.current().get("username")

    var Chat = Parse.Object.extend("Message");
    var chat = new Chat();

    //Print all messages in new window. 
    function PrintMessages(startNum) {
        var query = new Parse.Query(Chat);
        query.containedIn("Chat", [currentUser.get("username") + " + " + adress, adress + " + " + currentUser.get("username")]);
        query.find({
            success: function (usersPosts) {
                for (var i = 0; i < usersPosts.length - startNum; i++) {
                    var object = usersPosts[i];

                    var para = document.createElement("P");
                    var t = document.createTextNode(object.get("Sender") + ' - ' + object.get('Text'));
                    para.appendChild(t);
                    document.getElementById("username").appendChild(para);

                }
            }
        })
    }
    PrintMessages(1)


    //Print new message with interval 1.5 sec 
    var msgLength = 0;
    function interval() {
        var i = 0;
        setInterval(function () {
            var query = new Parse.Query(Chat);
            query.containedIn("Chat", [currentUser.get("username") + " + " + adress, adress + " + " + currentUser.get("username")]);
            query.find({
                success: function (UserDialogs) {
                    var arrayLength = UserDialogs.length;
                    if (msgLength != arrayLength) {
                        var object = UserDialogs[arrayLength - 1];
                        var para = document.createElement("P");
                        var t = document.createTextNode(object.get("Sender") + ' - ' + object.get('Text'));
                        para.appendChild(t);
                        document.getElementById("username").appendChild(para);

                    }
                    msgLength = arrayLength;
                },
                error: function () {
                    console.log("fk");
                }
            });

        }, 1500);

    }

    interval();

    // -- 
    $('.form-show').on('submit', function (e) {
        e.preventDefault();

        var Chat = Parse.Object.extend("Message");
        var chat = new Chat();

        var data = $(this).serializeArray(),
            messa = data[0].value;


            chat.set("Text", messa);
            chat.set("Sender", currentUser.get("username"));
            chat.set("Adresse", adress)
            chat.set("Chat", currentUser.get("username") + " + " + adress)
            chat.save(null, {
                success: function(chatsuc) {
                },
                error: function(chatsuc, error) {
                }
              });
            


    });


    
});