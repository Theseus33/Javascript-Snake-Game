//select canvas and set to constant
const cvs = document.getElementById("canvas");
//gives us method properties to draw
const ctx = cvs.getContext("2d");

//create the unit
const box = 32;

//load images

const ground = new Image();
ground.src = "img/ground.png";

const food = new Image();
ground.src = "img/food.png";
