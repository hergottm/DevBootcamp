var express     = require("express");
var app         = express();
var bodyParser  = require("body-parser");
var mongoose    = require("mongoose");
var Campground  = require("./models/campground");
var seedDB      = require("./seeds");




mongoose.connect("mongodb://localhost/yelp_camp");
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

// seeding the DB
seedDB();



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
    Campground.findById(req.params.id).populate("comments").exec(function(error, foundCampground){
       if(error){
           console.log(error);
       } else {
           console.log(foundCampground);
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