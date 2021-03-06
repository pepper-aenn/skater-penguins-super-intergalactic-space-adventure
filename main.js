console.log("Hello");

var canvas = document.querySelector("canvas");
var ctx = canvas.getContext("2d");
var width = canvas.width;
var height = canvas.height;
var bg = new Background(ctx, "images/city2.png", 0.5);
var penguin = new Player(ctx, "images/New Project.png", 1);
var makreleSpawn = [];
var imgMakrele = new Image();
imgMakrele.src = "images/Makrele_small.png";
var obstacle = ["images/bench.png", "images/pigeon.png", "images/trash.png"];
var newObstacle = [];
var frame = 0;
var counter = 0;
var counterLives = 3;
var imgLives = new Image();
imgLives.src = "images/littlepen2.png";

var interval = setInterval(function() {
  update();
  drawEverything();
  console.log("INTERVAL");
}, 1000 / 120);

function update() {
  bg.update();
  penguin.update();
  if (makreleSpawn.length <= 0) {
    makreleSpawn.push(new Fish(ctx, "images/Makrele_seefrost_1.png", 1));
  }

  makreleSpawn.forEach(one => {
    one.update();
  });
  frame++;
  if (frame % 500 === 0) {
    newObstacles();
  }
  for (var i = 0; i < newObstacle.length; i++) {
    newObstacle[i].update();
  }
  newObstacle.forEach(obstacle => {
    if (newObstacle.length > 0 && penguin.crashWith(obstacle)) {
      console.log("Crashed");
      crash.play();
      counterLives -= 1;
      if (counterLives == 0) {
        alert("Journey abort! You didn't make it!");
      } else if (counterLives > 0) {
        console.log("lives", interval);
      }
      clearInterval(interval);
    }
  });
  makreleSpawn.forEach((one, i) => {
    if (penguin.crashWith(one)) {
      collect.play();
      counter += 1;
      makreleSpawn.splice(i, 1);
      console.log("splice", makreleSpawn);
    }
  });
  newObstacle.filter(
    obstacle => (obstacle.x + obstacle.width < 0 ? false : true)
  );
}

function drawEverything() {
  ctx.clearRect(0, 0, width, height);
  bg.draw();
  counterDraw();
  livesDraw();
  penguin.draw();
  makreleSpawn.forEach(makrele => {
    makrele.draw();
  });
  for (var i = 0; i < newObstacle.length; i++) {
    newObstacle[i].draw();
  }
  function counterDraw() {
    ctx.drawImage(imgMakrele, 20, 28);
    ctx.font = "15px monospace";
    ctx.fillText("x " + counter, 130, 45);
  }
  function livesDraw() {
    ctx.drawImage(imgLives, 930, 15);
    ctx.font = "15px monospace";
    ctx.fillText(counterLives + " x", 890, 45);
  }
}

document.onkeydown = function(e) {
  switch (e.keyCode) {
    case 32:
      penguin.jump();
      console.log("jump", penguin);
      break;
  }
};

function newObstacles() {
  var iObstacle = Math.floor(Math.random() * Math.floor(obstacle.length));
  console.log("obstacle[iObstacle]", obstacle[iObstacle]);
  var y;
  if (iObstacle === 0) {
    y = 400;
  } else if (iObstacle === 1) {
    y = 100;
  } else {
    y = 345;
  }
  newObstacle.push(
    new Obstacle(ctx, obstacle[iObstacle], 1, y, canvas.width + 1)
  );
}

function getHighScores() {
  var highScores = JSON.parse(localStorage.getItem("highScores"));
  if (!Array.isArray(highScores)) {
    highScores = [];
  }
  return highScores;
}
function saveHighScore(score, name) {
  var highScores = getHighScores();
  highScores.push({ score: score, name: name });
  highScores.sort(function(a, b) {
    return b.score - a.score;
  });
  localStorage.setItem("highScores", JSON.stringify(highScores));
}

function renderHighScores() {
  var innerHTML = "<ul>";
  var highScores = getHighScores();
  for (var i = 0; i < highScores.length; i++) {
    innerHTML +=
      "<li>" + highScores[i].score + " (" + highScores[i].name + ")</li>";
  }
  innerHTML += "</ul>";
  document.getElementById("PreviousSkaters").innerHTML = innerHTML;
}
