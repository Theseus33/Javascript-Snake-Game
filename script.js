//select canvas and set to constant
const cvs = document.getElementById("snake");
//gives us method properties to draw
const ctx = cvs.getContext("2d");

//create the unit
const box = 32;

//load images

const ground = new Image();
ground.src = "img/ground.png";

const foodImg = new Image();
foodImg.src = "img/food.png";

//create the snake as an array starting with the head of the snake

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
//snake controls

let d;

document.addEventListener("keydown", direction);

function direction(event) {
  if (event.keyCode == 37) {
    d = "LEFT";
  } else if (event.keyCode == 38) {
    d = "UP";
  } else if (event.keyCode == 39) {
    d = "RIGHT";
  } else if (event.keyCode == 40) {
    d = "DOWN";
  }
}
//draw everything to the canvas

function draw() {
  ctx.drawImage(ground, 0, 0);

  for (let i = 0; i < snake.length; i++) {
    //snake head will be green rest is white
    ctx.fillStyle = i == 0 ? "green" : "white";
    ctx.fillRect(snake[i].x, snake[i].y, box, box);

    //draw a stroke

    ctx.fillStyle = "red";
    ctx.fillRect(snake[i].x, snake[i].y, box, box);
  }
  //draw the food to canvas

  ctx.drawImage(foodImg, food.x, food.y);

  //Score

  ctx.fillStyle = "white";
  ctx.font = "45px Changa one";
  ctx.fillText(score, 2 * box, 1.6 * box);
}

//call draw function every 100ms

let game = setInterval(draw, 100);
