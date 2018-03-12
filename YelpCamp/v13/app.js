var express             = require("express");
var app                 = express();
var bodyParser          = require("body-parser");
var mongoose            = require("mongoose");
var flash               = require("connect-flash");
var passport            = require("passport");
var LocalStrategy       = require("passport-local");
var methodOverride      = require("method-override");
var seedDB              = require("./seeds");
var User                = require("./models/user");
var path                = require("path");


// Requiring Routes
var commentRoutes       = require("./routes/comments");
var campgroundRoutes    = require("./routes/campgrounds");
var indexRoutes         = require("./routes/index");

mongoose.connect("mongodb://localhost/yelp_camp_v13");
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use('/public', express.static(path.join(__dirname + '/public')));
app.use(methodOverride("_method"));
app.use(flash());

// seeding the DB
// seedDB();

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
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
})

// Require the route files
app.use("/", indexRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);

// listener
app.listen(process.env.PORT, process.env.IP, function(){
    console.log("The Yelp Camp server has started!");
});

