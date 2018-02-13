var express = require("express");
var app = express();
app.set("view engine", "ejs");

app.get("/", function(req, res){
    res.render("landing");
});

app.get("/campgrounds", function(req, res){
    var campgrounds = [
        {name: "Salmon Creek", image:"https://cdn.pixabay.com/photo/2016/11/21/15/14/camping-1845906_960_720.jpg"},
        {name: "Granite Hill", image:"https://cdn.pixabay.com/photo/2017/04/29/23/44/america-2271828_960_720.jpg"},
        {name: "Mountain Goats", image:"https://cdn.pixabay.com/photo/2017/11/16/09/59/camping-2953935_960_720.jpg"}
    ]
    
    res.render("campgrounds", {campgrounds:campgrounds} );
});


// listener
app.listen(process.env.PORT, process.env.IP, function(){
    console.log("The Yelp Camp server has started!");
});