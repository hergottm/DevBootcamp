var express         = require("express");
var router          = express.Router({mergeParams: true});
var Campground      = require("../models/campground");
var Comment         = require("../models/comment");


router.get("/new", isLogginIn, function(req, res) {
    // Find campground by ID
    Campground.findById(req.params.id, function(error, campground){
       if(error){
           console.log(error);
       } else {
           res.render("comments/new", {campground: campground});
       }
    });
});

router.post("/", isLogginIn, function(req, res){
    // lookup campground using ID
    Campground.findById(req.params.id, function(error, campground) {
        if(error){
           console.log(error);
           res.redirect("/campgrounds");
       } else {
            Comment.create(req.body.comment, function(error, comment){
                if(error){
                    console.log(error);
                } else {
                    campground.comments.push(comment._id);
                    campground.save();
                    res.redirect("/campgrounds/" + campground._id);
                }
            });
       }
    });
});

//middleware
function isLogginIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}


module.exports = router;