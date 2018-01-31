// var tag = document.getElementById("highlight");
// var tags = document.getElementsByClassName("bolded");
// var tags = document.getElementsByTagName("li");

// //add css selector items
// var h1 = document.querySelector("h1");
// var id = document.querySelector("#highlight"); //only first/one item
// var classes = document.querySelector(".bolded"); //only first/one item

// var allClasses = document.querySelectorALL(".bolded") //selects everthing witht he class "bolded"

//select element
var tag = document.getElementById("highlight");
//manipulate element
tag.style.color = "blue";
tag.style.border = "10px solid red";
tag.style.fontSize = "40px";
tag.style.background = "yellow";
//tag.style.marginTop = "20px";


// textContent
//select the <p> tag
var tag = document.querySelector("p");
// Retrieve the textContent:
tag.textContent;
// alter the textContent
tag.textContent = "blah blah blah";

// innerHTML
//select the <p> tag
var tag = document.querySelector("p");
tag.innerHTML;


// Attributes
// select the <a> tag
var link = document.querySelector("a");
// Retrieve the attribute
link.getAttribute("href")
//change href attribute
link.setAttribute("href". "www.dogs.com");

//to change the img source
var img = document.querySelector("img");
img.setAttribute("src", "corgi.png");







