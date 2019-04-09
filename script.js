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

//create the snake as an array

let snake = [];
snake[0] = {
  x: 9 * box,
  y: 10 * box
};

//food made randomized using x and y positions

let food = {
  x: Math.floor(Math.random() * 17 + 1) * box,
  y: Math.floor(Math.random() * 15 + 3) * box
};

//score variable

let score = 0;
