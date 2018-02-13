var express = require("express");
var app = express();
var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");


    var campgrounds = [
        {name: "Salmon Creek", image:"https://images.unsplash.com/photo-1437382944886-45a9f73d4158?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=3895efc1fd5d2fb67acdaee4b5d9c463&auto=format&fit=crop&w=1950&q=80"},
        {name: "Granite Hill", image:"https://images.unsplash.com/photo-1455763916899-e8b50eca9967?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=ec456c4aeb71d3aecbe65e586d186ec0&auto=format&fit=crop&w=1950&q=80"},
        {name: "Mountain Goats", image:"https://images.unsplash.com/photo-1476041800959-2f6bb412c8ce?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=c85daa025ee04c951b6ac12fe3ba031a&auto=format&fit=crop&w=1950&q=80"},
        {name: "Salmon Creek", image:"https://images.unsplash.com/photo-1437382944886-45a9f73d4158?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=3895efc1fd5d2fb67acdaee4b5d9c463&auto=format&fit=crop&w=1950&q=80"},
        {name: "Granite Hill", image:"https://images.unsplash.com/photo-1455763916899-e8b50eca9967?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=ec456c4aeb71d3aecbe65e586d186ec0&auto=format&fit=crop&w=1950&q=80"},
        {name: "Mountain Goats", image:"https://images.unsplash.com/photo-1476041800959-2f6bb412c8ce?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=c85daa025ee04c951b6ac12fe3ba031a&auto=format&fit=crop&w=1950&q=80"},
        {name: "Salmon Creek", image:"https://images.unsplash.com/photo-1437382944886-45a9f73d4158?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=3895efc1fd5d2fb67acdaee4b5d9c463&auto=format&fit=crop&w=1950&q=80"},
        {name: "Granite Hill", image:"https://images.unsplash.com/photo-1455763916899-e8b50eca9967?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=ec456c4aeb71d3aecbe65e586d186ec0&auto=format&fit=crop&w=1950&q=80"},
        {name: "Mountain Goats", image:"https://images.unsplash.com/photo-1476041800959-2f6bb412c8ce?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=c85daa025ee04c951b6ac12fe3ba031a&auto=format&fit=crop&w=1950&q=80"}
    ]

// root route
app.get("/", function(req, res){
    res.render("landing");
});


// campground route
app.get("/campgrounds", function(req, res){
    res.render("campgrounds", {campgrounds:campgrounds} );
});

// post route
app.post("/campgrounds", function(req,res){
    // get data from form and add to campgrounds array
    var name = req.body.name;
    var image = req.body.image;
    var newCampground = {name: name, image: image}
    campgrounds.push(newCampground);
    // redirect back to campgrounds page
    res.redirect("/campgrounds")
});

app.get("/campgrounds/new", function(req, res) {
    res.render("new.ejs");
})


// listener
app.listen(process.env.PORT, process.env.IP, function(){
    console.log("The Yelp Camp server has started!");
});