var express         = require("express");
var router          = express.Router();
var Campground      = require("../models/campground");

// INDEX - show all campgrounds
router.get("/", function(req, res){
    // Get all campground from DB
    Campground.find({}, function(error, allCampgrounds){
        if(error){
            console.log(error);
        } else {
            res.render("campgrounds/index", {campgrounds:allCampgrounds} );
        }
    });
});

// CREATE - add new campground to DB
router.post("/", isLogginIn,function(req,res){
    // get data from form and add to campgrounds array
    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.description;
    var author = {
        id: req.user._id,
        username: req.user.username
    }
    var newCampground = {name: name, image: image, description: desc, author: author}
    
    // Create a new campground and save to DB
    Campground.create(newCampground, function(error, newlyCreated){
        if(error){
            console.log(error);
        } else {
            res.redirect("/campgrounds");                  
        }
    });
});


// NEW - show form to create new campground
router.get("/new", isLogginIn,function(req, res) {
    res.render("campgrounds/new");
});


// SHOW - shows more info about one campground
router.get("/:id", function(req, res) {
    // find campground with provided ID
    Campground.findById(req.params.id).populate("comments").exec(function(error, foundCampground){
       if(error){
           console.log(error);
       } else {
           console.log(foundCampground);
               // render show template with that campground
           res.render("campgrounds/show", {campground: foundCampground});
       }
    });
});


// EDIT CAMPGROUND ROUTE
router.get("/:id/edit", function(req, res) {
    //is user logged in
    if(req.isAuthenticated()){
        Campground.findById(req.params.id, function(error, foundCampground){
            if(error){
                res.redirect("/campgrounds");
            } else {
                if(foundCampground.author.id.equals(req.user._id)){
                    res.render("campgrounds/edit", {campground: foundCampground});
                } else {
                    res.send("You do not have permission to do that!!");
                }
            }
        });
    } else {
        // does user own the campground?
        res.send("You need to be logged in to do that!!");
    }
});

// UPDATE CAMPGROUND ROUTE
router.put("/:id", function(req, res){
   // find and update the correct campground
   Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(error, updatedCampground){
      if(error){
          res.redirect("/campgrounds");
      } else {
          res.redirect("/campgrounds/" + req.params.id);
      } 
   });
});

// DELETE CAMGROUND ROUTE



//middleware
function isLogginIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

module.exports = router;