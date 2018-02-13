var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/cat_app");

var catSchema = new mongoose.Schema({
    name: String,
    age: Number,
    temperament: String
});

var Cat = mongoose.model("Cat", catSchema);

// // adding a new cat to the DB
// var newCat = new Cat({
//     name: "Mrs. Norris",
//     age: 7,
//     temperament: "Evil"
// });

// newCat.save(function(err, cat){
//     if(err){
//         console.log("")
//     } else {
//         console.log("We just saved a cat to the db: ");
//         console.log(cat); //what is being sent back from the DB (cat)
//     }
// });

Cat.create({
    name: "Snow White",
    age: 15,
    temperament: "Bland"
}, function(error, cat){
    if(error){
        console.log(error);
    } else {
        console.log(cat);
    }
});

// retrieve all cats from the DB and console.db each one
Cat.find({}, function(error, cats){
    if(error){
        console.log("OH NO, ERROR!");
        console.log(error);
    } else {
        console.log("All the cats.... ");
        console.log(cats);
    }
});

