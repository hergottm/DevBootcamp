var mongoose = require("mongoose");
mongoose.connect("mongoDB://localhost/blog_demo");


// POST - title, content
var postSchema = new mongoose.Schema({
    title: String,
    content: String
});

// User - email, name
var userSchema = new mongoose.Schema({
    email: String,
    name: String,
    posts: [postSchema]
});


var User = mongoose.model("User", userSchema);


var Post = mongoose.model("Post", postSchema);

// var newUser = new User({
//     email: "zach@western.ca",
//     name: "Zach White"
// });

// newUser.posts.push({
//     title: "Hogwartz: the after story",
//     content: "Once upon a day in July...."
// })

// newUser.save(function(error, user){
//     if(error){
//         console.log(error);
//     } else {
//         console.log(user);
//     }    
// });

// var newPost = new Post({
//     title: "reflections on apples",
//     content: "They are delicious"
// });
// newPost.save(function(error, post){
//     if(error){
//         console.log(error);
//     } else {
//         console.log(post);
//     }
// });

User.findOne({name: "Zach White"}, function(error, user){
    if(error){
        //console.log(error);
    } else {
        user.posts.push({
            title: "1 thing i really hate",
            content: "snakes"
            
        });
        user.save(function(error, user){
            if(error){
                console.log(error);
            } else {
                console.log(user);
            }
        });
    }
});