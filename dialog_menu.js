$(function () {

    Parse.$ = jQuery;
    Parse.serverURL = 'https://pg-app-b2ytjhkfff1uq7gc4agcly2dqxlrvs.scalabl.cloud/1/';
    //ApplicationID, JavaScriptKey 
    Parse.initialize("uXhZSvLwU0kQbLgZLtQZryYDQneSQNnTPPgGTiNj", "3qTYbEaukt2BwOPrqgN4R4sJ76NPnOQkTGgTSe6Q");


    Parse.User.enableUnsafeCurrentUser()
    var currentUser = Parse.User.current();

    document.getElementById("username").innerText = Parse.User.current().get("username")



    // update dialogs.
    function SetDialogs(adresse, NewMessage, printAllDialogs) {
        
        var Dialogs = Parse.Object.extend("Dialogs");
        var dialog = new Dialogs();

        var Message = Parse.Object.extend("Message");
        var message = new Message();


        if (!printAllDialogs) {
            dialog.set("Sender", currentUser.get("username"))
            dialog.set("Adresse", adresse)
            dialog.set("OurDialog", currentUser.get("username") + " + " + adresse)

            message.set("Sender", currentUser.get("username"))
            message.set("Adresse", adresse)
            message.set("Chat", currentUser.get("username") + " + " + adresse)
            message.set("Text", NewMessage)

            message.save()
            dialog.save(null, {
                success: function (NewDialog) {
                    var query = new Parse.Query(Message);
                    query.equalTo("Sender", currentUser.get("username"));
                    query.find({
                        success: function (UserDialogs) {
                            console.log("здесь")
                            var object = UserDialogs[UserDialogs.length - 1];
                            var para = document.createElement("P");
                            var t = document.createTextNode(adresse + " " + NewMessage);
                            para.appendChild(t);
                            para.onclick = function (adresse) {
                                return function () {
                                    window.location.href = "main.html?Adresse=" + adresse;
                                }
                            }(object.get("Adresse"));
                            document.getElementById("username").appendChild(para);


                        }
                    });
                }
                // Call Parse Login function with those variables

            });
        }
        else {

            var query = new Parse.Query(Dialogs);
            query.contains("Sender", currentUser.get("username"));
            var arr = [];
            query.find({
                success: function (Senders) {
                    for (var i = 0; i < Senders.length; i++) {
                        var FirstObject = Senders[i]
                        SetAllDialogs(FirstObject.get("Sender"), FirstObject.get("Adresse"))
                        arr[i] = FirstObject.get("Adresse")
                    }
                    var query = new Parse.Query(Dialogs);
                    query.contains("Adresse", currentUser.get("username"));
                    query.find({
                        success: function (Adresse) {
                            for (var i = 0; i < Adresse.length; i++) {
                                var SecondObject = Adresse[i]
                                if (arr.indexOf(SecondObject.get("Sender")) == -1) {
                                    console.log(SecondObject.get("Adresse"))
                                    SetAllDialogs(SecondObject.get("Adresse"), SecondObject.get("Sender"))
                                }


                            }
                        }

                    })


                }
            });

        }
    }

    function SetAllDialogs(sender, adresse) {

        var Message = Parse.Object.extend("Message");
        var message = new Message();

        var query = new Parse.Query(Message);
        query.containedIn("Chat", [sender + " + " + adresse, adresse + " + " + sender]);
        query.find({
            success: function (UserDialogs) {
                var object = UserDialogs[UserDialogs.length - 1];
                var lastMessage = object.get('Text')

                var para = document.createElement("P");
                var t = document.createTextNode("Dialog with " + adresse + " : " + object.get("Adresse") + ' - ' + object.get("Text"));
                para.appendChild(t);
                para.onclick = function (adresse) {
                    return function () {
                        window.location.href = "main.html?Adresse=" + adresse;
                    }
                }(adresse);
                document.getElementById("username").appendChild(para);



            }


        })
    }

    function checkUsers(adresse, message) {

        var Dialogs = Parse.Object.extend("Dialogs");
        var dialog = new Dialogs();

        var Users = Parse.Object.extend("User");
        var users = new Users();

        var correctInUsersList = false;
        var correctInDialogsList = false;

        var query = new Parse.Query(Users);

        query.find({
            success: function GetUsers(GetUsers) {

                for (var i = 0; i < GetUsers.length; i++) {
                    var object = GetUsers[i];
                    if (object.get("username") == adresse) {
                        correctInUsersList = true;
                        break;

                    }
                }

                if (correctInUsersList) {
                    var query = new Parse.Query(Dialogs);
                    query.equalTo("Sender", currentUser.get("username")),
                        query.find({
                            success: function GetDialogs(GetDialogs) {
                                for (var i = 0; i < GetDialogs.length; i++) {
                                    var object = GetDialogs[i];
                                    console.log(object.get("Adresse"))
                                    if (object.get("Adresse") == adresse) {
                                        correctInDialogsList = true;
                                        break;

                                    }
                                }
                                if (!correctInDialogsList) {
                                    SetDialogs(adresse, message, false)
                                }


                            }
                        })
                }
            }
        })

    }

    var Message = Parse.Object.extend("Message");
    var message = new Message();

    var msgLength = 0;
    function interval() {
        var i = 0;
        setInterval(function () {
            var query = new Parse.Query(Message);
            query.contains("Chat",  currentUser.get("username"));
            query.find({
                success: function (UserDialogs) {
                    var arrayLength = UserDialogs.length;
                    if (msgLength != arrayLength) {
                        SetDialogs(0, 0, true)
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

    


    $('.form-show').on('submit', function (e) {
        // Prevent Default Submit Event
        e.preventDefault();

        // Get data from the form and put them into variables
        var data = $(this).serializeArray(),
            message = data[0].value,
            adresse = data[1].value;

        checkUsers(adresse, message)





    });
});