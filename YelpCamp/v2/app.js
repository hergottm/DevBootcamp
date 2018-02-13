var express     = require("express");
var app         = express();
var bodyParser  = require("body-parser");
var mongoose    = require("mongoose");

mongoose.connect("mongodb://localhost/yelp_camp");
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");


// SCHEMA SETUP
var campgroundSchema = new mongoose.Schema({
    name: String,
    image: String
});

var Campground = mongoose.model("Campground", campgroundSchema);

// Campground.create({
//     name: "Salmon Creek", 
//     image:"https://images.unsplash.com/photo-1437382944886-45a9f73d4158?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=3895efc1fd5d2fb67acdaee4b5d9c463&auto=format&fit=crop&w=1950&q=80"
// }, function(error, campground){
//     if(error){
//         console.log(error);
//     } else {
//         console.log("Newly created campground: ");
//         console.log(campground);
//     }
// });


// root route
app.get("/", function(req, res){
    res.render("landing");
});


// campground route
app.get("/campgrounds", function(req, res){
    // Get all campground from DB
    Campground.find({}, function(error, allCampgrounds){
        if(error){
            console.log(error);
        } else {
            res.render("campgrounds", {campgrounds:allCampgrounds} );
        }
    })
});

// post route
app.post("/campgrounds", function(req,res){
    // get data from form and add to campgrounds array
    var name = req.body.name;
    var image = req.body.image;
    var newCampground = {name: name, image: image}
    // Create a new campground and save to DB
    Campground.create(newCampground, function(error, newlyCreated){
        if(error){
            console.log(error);
        } else {
            res.redirect("/campgrounds")                  
        }
    });
});

app.get("/campgrounds/new", function(req, res) {
    res.render("new.ejs");
})


// listener
app.listen(process.env.PORT, process.env.IP, function(){
    console.log("The Yelp Camp server has started!");
});