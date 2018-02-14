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
    image: String,
    description: String
});

var Campground = mongoose.model("Campground", campgroundSchema);

// Campground.create({
//     name: "Granite Hill", 
//     image:"https://images.unsplash.com/photo-1437382944886-45a9f73d4158?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=3895efc1fd5d2fb67acdaee4b5d9c463&auto=format&fit=crop&w=1950&q=80",
//     description: "This is a huge granite hill, no bathrooms, no water beautiful granite!"
// }, function(error, campground){
//     if(error){
//         console.log(error);
//     } else {
//         console.log("Newly created campground: ");
//         console.log(campground);
//     }
// });



app.get("/", function(req, res){
    res.render("landing");
});


// INDEX - show all campgrounds
app.get("/campgrounds", function(req, res){
    // Get all campground from DB
    Campground.find({}, function(error, allCampgrounds){
        if(error){
            console.log(error);
        } else {
            res.render("index", {campgrounds:allCampgrounds} );
        }
    })
});

// CREATE - add new campground to DB
app.post("/campgrounds", function(req,res){
    // get data from form and add to campgrounds array
    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.description
    var newCampground = {name: name, image: image, description: desc}
    // Create a new campground and save to DB
    Campground.create(newCampground, function(error, newlyCreated){
        if(error){
            console.log(error);
        } else {
            res.redirect("/campgrounds")                  
        }
    });
});


// NEW - show form to create new campground
app.get("/campgrounds/new", function(req, res) {
    res.render("new.ejs");
})

// SHOW - shows more info about one campground
app.get("/campgrounds/:id", function(req, res) {
    // find campground with provided ID
    Campground.findById(req.params.id, function(error, foundCampground){
       if(error){
           console.log(error);
       } else {
               // render show template with that campground
           res.render("show", {campground: foundCampground});
       }
    });
});


// listener
app.listen(process.env.PORT, process.env.IP, function(){
    console.log("The Yelp Camp server has started!");
});


// // Restful Routes
// name        url         verb        desc.
// ========================================================
// INDEX       /dogs       GET         Display a list of all dogs
// NEW         /dogs/new   GET         Displays form to make a new dogs
// CREATE      /dogs       POST        Add new dog to DB
// SHOW        /dogs/:id   GET         Shows info about one dog