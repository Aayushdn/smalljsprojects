'use strict'
const snakeBoard = document.getElementById("gameCanvas");
const snakeBoard_ctx = snakeBoard.getContext("2d");


const scoreElem = document.querySelector(".score");
const highScoreElem = document.querySelector(".highscore");
const console = document.querySelector(".console");
const action = document.querySelector(".action");
const playAgain = document.querySelector("#playAgain");
const resetHighScore = document.querySelector("#resetHS");


let boardWidth = 550;
let boardHeight = 550;
let boardBackground = "#2c2b2b";

let score = 0;
let highscore = Number(localStorage.getItem("highscore")) || 0;

let dx = 0;
let dy = 0;

let food_x, food_y;

let changing_direction = false;
let recievedHighScoreAlert = false;

let snake = [
  { x: 200, y: 200 },
  { x: 190, y: 200 },
  { x: 180, y: 200 },
  { x: 170, y: 200 },
];

function clearCanvas() {
  snakeBoard_ctx.fillStyle = boardBackground;
  snakeBoard_ctx.fillRect(0, 0, boardWidth, boardHeight);
}

function drawSnakePart(snakepart) {
  snakeBoard_ctx.fillStyle = "green";
  snakeBoard_ctx.strokeStyle = boardBackground;
  snakeBoard_ctx.fillRect(snakepart.x, snakepart.y, 10, 10);
  snakeBoard_ctx.strokeRect(snakepart.x, snakepart.y, 10, 10);
}

function writeConsole(html) {
  console.insertAdjacentHTML("beforeend", html);
}

function moveSnake() {
  const head = { x: snake[0].x + dx, y: snake[0].y + dy };
  snake.unshift(head);
  const has_eaten = snake[0].x == food_x && snake[0].y == food_y;
  if (has_eaten) {
    score += 10;
    if (Number(score) > Number(highscore)) {
    highscore = score;
      localStorage.setItem("highscore", highscore);
      highScoreElem.textContent = highscore;
      if (!recievedHighScoreAlert){
        const html = `<p> > HIGH SCORE ACHIEVED congratulation 🎉 ......`;
        writeConsole(html);
        recievedHighScoreAlert = true;
      }
    }
    scoreElem.textContent = score;
    genFood();
  } else {
    snake.pop();
  }
}

function random_food(min, max) {
  return Math.round((Math.random() * (max - min) + min) / 10) * 10;
}

function drawFood() {
  snakeBoard_ctx.fillStyle = "yellow";
  snakeBoard_ctx.strokeStyle = "red";
  snakeBoard_ctx.fillRect(food_x, food_y, 10, 10);
  snakeBoard_ctx.strokeRect(food_x, food_y, 10, 10);
}

function genFood() {
  food_x = random_food(10, boardWidth - 10);
  food_y = random_food(10, boardHeight - 10);

  snake.forEach(function has_eaten_food(part) {
    const has_eaten = part.x == food_x && part.y == food_y;
    if (has_eaten) genFood();
  });
}

function change_direction(event) {
  const LEFT_KEY = 37;
  const RIGHT_KEY = 39;
  const UP_KEY = 38;
  const DOWN_KEY = 40;
  if (changing_direction) return;
  changing_direction = true;

  const keyPressed = event.keyCode;
  const goingUp = dy === -10;
  const goingDown = dy === 10;
  const goingRight = dx === 10;
  const goingLeft = dx === -10;

  if (keyPressed === LEFT_KEY && !goingRight) {
    dx = -10;
    dy = 0;
  }

  if (keyPressed === UP_KEY && !goingDown) {
    dx = 0;
    dy = -10;
  }

  if (keyPressed === RIGHT_KEY && !goingLeft) {
    dx = 10;
    dy = 0;
  }

  if (keyPressed === DOWN_KEY && !goingUp) {
    dx = 0;
    dy = 10;
  }
}

document.addEventListener("keydown", change_direction);

function resetGame(){
    snake = [
        { x: 200, y: 200 },
        { x: 190, y: 200 },
        { x: 180, y: 200 },
        { x: 170, y: 200 },
      ];
    clearConsole();
    action.style.display = "none";
    score = 0;
    scoreElem.textContent = score;
    recievedHighScoreAlert = false;
    main();
}

function resetHS(){
    localStorage.setItem("highscore",0);
    highScoreElem.textContent = 0;
    highscore = 0;
}



playAgain.addEventListener("click",resetGame)
resetHighScore.addEventListener("click",resetHS);

function has_game_ended() {
  for (let i = 4; i < snake.length; i++) {
    const has_collided = snake[i].x === snake[0].x && snake[i].y === snake[0].y;
    if (has_collided) return true;
  }
  const hitLeftWall = snake[0].x < 0;
  const hitRightWall = snake[0].x > boardWidth;
  const hitTopWall = snake[0].y < 0;
  const hitBottomWall = snake[0].y > boardHeight;

  return hitLeftWall || hitRightWall || hitTopWall || hitBottomWall;
}

function drawSnake() {
  snake.forEach(drawSnakePart);
}

function clearConsole() {
  console.innerHTML = "";
}

function wait(s) {
  return new Promise(function (resolve) {
    let html = `
        <div class="loading">
                > <span> ... </span>  
        </div> 
        `;
    writeConsole(html);
    setTimeout(resolve, s * 1000);
  });
}
async function gameEnd() {
    score = 0;
  await wait(1);
  clearCanvas();
  clearConsole();
  let html = `
        <div class="loading">
                > <h1> GAME OVER!!! </h1>  
        </div> 
        `;
  writeConsole(html);
  action.style.display = "flex";
}

function main() {
  if (has_game_ended()) {
    gameEnd();
    return;
  }
  
  highScoreElem.textContent = highscore;
  changing_direction = false;
  setTimeout(function onTick() {
    clearCanvas();
    drawFood();
    moveSnake();
    drawSnake();
    main();
  }, 100);
}


main();
genFood();
