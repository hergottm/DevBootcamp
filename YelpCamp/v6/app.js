var express         = require("express");
var app             = express();
var bodyParser      = require("body-parser");
var mongoose        = require("mongoose");
var passport        = require("passport");
var LocalStrategy   = require("passport-local");
var Campground      = require("./models/campground");
var seedDB          = require("./seeds");
var Comment         = require("./models/comment");
var User            = require("./models/user");
var path            = require("path");


mongoose.connect("mongodb://localhost/yelp_camp_v6");
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use('/public', express.static(path.join(__dirname + '/public')));
// seeding the DB
seedDB();

// ====================
// PASSPORT CONFIG
// ====================
app.use(require("express-session")({
    secret: "Once again Wins, cutest dog!",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    next();
})


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
            res.render("campgrounds/index", {campgrounds:allCampgrounds} );
        }
    });
});

// CREATE - add new campground to DB
app.post("/campgrounds", isLogginIn, function(req,res){
    // get data from form and add to campgrounds array
    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.description;
    var newCampground = {name: name, image: image, description: desc}
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
app.get("/campgrounds/new", function(req, res) {
    res.render("campgrounds/new");
});

// SHOW - shows more info about one campground
app.get("/campgrounds/:id", function(req, res) {
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

// =================================
// COMMENTS ROUTES
// =================================

app.get("/campgrounds/:id/comments/new", isLogginIn, function(req, res) {
    Campground.findById(req.params.id, function(error, campground){
       if(error){
           console.log(error);
       } else {
           res.render("comments/new", {campground: campground});
       }
    });
});

app.post("/campgrounds/:id/comments", isLogginIn, function(req, res){
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
    // create new comment
    // connect new comment to campground
    // redirect to campgrond show page
});


// =====================
// AUTH ROUTES
// =====================
app.get("/register", function(req, res) {
    res.render("register");
});

// handle signup logic
app.post("/register", function(req, res) {
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function(error,user){
        if(error){
            console.log("error");
            return res.render("register");
        }
        passport.authenticate("local")(req, res, function(){
            res.redirect("/campgrounds");
        })
    });
});

// show login form
app.get("/login", function(req, res) {
    res.render("login");
});

app.post("/login", passport.authenticate("local",
{
     successRedirect:"/campgrounds",
     failureRedirect:"/login"
}), function(req, res) {

})

// logic route
app.get("/logout", function(req, res) {
    req.logout();
    res.redirect("/login")
})

function isLogginIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

// listener
app.listen(process.env.PORT, process.env.IP, function(){
    console.log("The Yelp Camp server has started!");
});

