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

//load audio files

let dead = new Audio();
let eat = new Audio();
let up = new Audio();
let right = new Audio();
let left = new Audio();
let down = new Audio();

dead.src = "audio/dead.mp3";
eat.src = "audio/eat.mp3";
up.src = "audio/up.mp3";
right.src = "audio/right.mp3";
left.src = "audio/left.mp3";
down.src = "audio/down.mp3";

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

//makes sure snake cant go opposite direction of its path and plays associated sound
function direction(event) {
  let key = event.keyCode;
  if (key == 37 && d != "RIGHT") {
    left.play();
    d = "LEFT";
  } else if (key == 38 && d != "DOWN") {
    up.play();
    d = "UP";
  } else if (key == 39 && d != "LEFT") {
    right.play();
    d = "RIGHT";
  } else if (key == 40 && d != "UP") {
    down.play();
    d = "DOWN";
  }
}

//check collision function
function collision(head, array) {
  for (let i = 0; i < array.length; i++) {
    if (head.x == array[i].x && head.y == array[i].y) {
      return true;
    }
  }
  return false;
}

//draw everything to the canvas

function draw() {
  ctx.drawImage(ground, 0, 0);

  for (let i = 0; i < snake.length; i++) {
    //snake head will be green rest is white
    ctx.fillStyle = i == 0 ? "green" : "white";
    ctx.fillRect(snake[i].x, snake[i].y, box, box);

    //draw a stroke

    ctx.strokeStyle = "red";
    ctx.strokeRect(snake[i].x, snake[i].y, box, box);
  }
  //draw the food to canvas

  ctx.drawImage(foodImg, food.x, food.y);

  //for movement we are taking off the tail and adding to the head
  //old head position
  let snakeX = snake[0].x;
  let snakeY = snake[0].y;

  //check direction pressed
  if (d == "LEFT") snakeX -= box;
  if (d == "UP") snakeY -= box;
  if (d == "RIGHT") snakeX += box;
  if (d == "DOWN") snakeY += box;

  //food eating condition adds to scsore if snake head = food location
  if (snakeX == food.x && snakeY == food.y) {
    score++;
    eat.play();
    // respawns the food
    food = {
      x: Math.floor(Math.random() * 17 + 1) * box,
      y: Math.floor(Math.random() * 15 + 3) * box
    };
    //we dont remove the tail
  } else {
    //remove the tail
    snake.pop();
  }

  //add new head

  let newHead = {
    x: snakeX,
    y: snakeY
  };

  //game end rules

  if (
    snakeX < box ||
    snakeX > 17 * box ||
    snakeY < 3 * box ||
    snakeY > 17 * box ||
    collision(newHead, snake)
  ) {
    clearInterval(game);
    dead.play();
  }

  snake.unshift(newHead);

  //Score
  ctx.fillStyle = "white";
  ctx.font = "45px Changa one";
  ctx.fillText(score, 2 * box, 1.6 * box);
}

//call draw function every 100ms

let game = setInterval(draw, 100);
