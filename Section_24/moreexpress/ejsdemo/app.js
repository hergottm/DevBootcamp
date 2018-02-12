var express = require("express");
var app = express();

app.use(express.static("public"));
app.set("view engine", "ejs");

app.get("/", function(req, res){
    res.render("index");
});

app.get("/fallinlovewith/:thing", function(req, res){
    var thing = req.params.thing;
    res.render("love", {thingVar: thing});
});


app.get("/posts", function(req, res) {
    var posts = [
        {title: "Post 1", author: "Frank"},
        {title: "My pet bunny", author: "Jack"},
        {title: "Can you believe this Frenchy!", author: "Matt"}
        ];
    
    res.render("posts", {posts: posts});
    
    
});

//listener
app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server is listening");
});