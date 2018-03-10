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

// Comments Create
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
                    // add username & id to comment
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    // save comment
                    comment.save();
                    campground.comments.push(comment._id);
                    campground.save();
                    console.log(comment);
                    res.redirect("/campgrounds/" + campground._id);
                }
            });
       }
    });
});

// COMMENTS EDIT ROUTE
router.get("/:comment_id/edit", function(req, res){
    Comment.findById(req.params.comment_id, function(error, foundComment) {
        if(error){
            res.redirect("back");
        } else {
            res.render("comments/edit", {campground_id: req.params.id, comment: foundComment});
        }
    });
});


// COMMENTS UPDATE ROUTE
router.put("/:comment_id", function(req, res){
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(error, updatedComment){
        if(error){
            res.redirect("back");
        } else {
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
});

// COMMENT DESTROY ROUTE
router.delete("/:comment_id", function(req, res){
    Comment.findByIdAndRemove(req.params.comment_id, function(error){
        if(error){
            res.redirect("back");
        } else {
            res.redirect("/campgrounds/" + req.params.id);
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