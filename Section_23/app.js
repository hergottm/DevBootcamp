var express = require("express");
var app = express();

// "/" => "Hi there!"
app.get("/", function(req, res){
    res.send ("Hi there!");
});
// "/bye" => "Goodbye"
app.get("/bye", function(req, res){
    res.send("Goodbye!");
});
// "/dog" => "ROOF!"
app.get("/dog", function(req, res){
    res.send("ROOF!");
});

app.get("/r/:subredditName", function(req, res) {
    var subreddit = req.params.subredditName;
    res.send("Welcome to the " + subreddit.toUpperCase() + " subreddit!");
});

app.get("/r/:subredditName/comments/:id/:title/", function(req, res) {
    console.log(req.params);
    res.send("Welcome to the comments page!!");
});

app.get("*", function(req, res) {
    res.send("You are a star!!!");
});

// tell express to listen for requests (start server)
app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server has started!");
});