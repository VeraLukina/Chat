var Parse = require('parse');
Parse.initilize("N06MrHAtbHBXZYEPN1nR2lx2hfRWaYTg6PPWTMf8");
Parse.serverURL = 'https://pg-app-b2ytjhkfff1uq7gc4agcly2dqxlrvs.scalabl.cloud/1/';
var GameScore = Parse.Object.extend("GameScore");
var gameScore = new GameScore();

gameScore.set("score", 1337);
gameScore.set("playerName", "Sean Plott");
gameScore.set("cheatMode", false);

gameScore.save(null, {
  success: function(gameScore) {
    // Execute any logic that should take place after the object is saved.
    alert('New object created with objectId: ' + gameScore.id);
  },
  error: function(gameScore, error) {
    // Execute any logic that should take place if the save fails.
    // error is a Parse.Error with an error code and message.
    alert('Failed to create new object, with error code: ' + error.message);
  }
});