import DFSMaze3dGenerator from "./dfs-maze-3d-generator.js";
import Maze3d from "./maze3d.js";
import SearchDemo from "./search-demo.js";



const inptName = document.querySelector("#name")
const startNewGameButton = document.querySelector("#start").addEventListener("click", startNewGame)

let isGame = 0;
function isValidMove(id) {
  const place = [Number(id[0]), Number(id[1]), Number(id[2])];
  return true;
}
function placePlayer(cell) {
  const player = document.createElement("img");
  player.id = "player";
  player.setAttribute("move", 0);
  standPlayerAnimation(player);
  cell.appendChild(player);
}
function makeMove() {
  if (isGame) {
    document.addEventListener("keydown", (e) => {
      e.preventDefault();
      const currCell = document.querySelector(".current-cell");
      const currCellId = currCell.id;

      const directions = new Map([
        ["ArrowUp", `${currCellId[0]}${Number(currCellId[1]) - 1}${currCellId[2]}`],
        ["ArrowDown", `${currCellId[0]}${Number(currCellId[1]) + 1}${currCellId[2]}`],
        ["ArrowLeft", `${currCellId[0]}${currCellId[1]}${Number(currCellId[2]) - 1}`],
        ["ArrowRight", `${currCellId[0]}${currCellId[1]}${Number(currCellId[2]) + 1}`],
        ["PageUp", `${Number(currCellId[0]) + 1}${currCellId[1]}${currCellId[2]}`],
        ["PageDown", `${Number(currCellId[0]) - 1}${currCellId[1]}${currCellId[2]}`]
      ])

      if (directions.has(e.key)) {
        currCell.classList.remove("current-cell");
        currCell.removeChild(document.getElementById("player"));
        const move = directions.get(e.key);
        if (isValidMove(move)) {
          const currentLevel = document.querySelector(".current-level");
          currentLevel.classList.remove("current-level");

          const nextCell = document.getElementById(move);
          nextCell.classList.add("current-cell");
          const nextLevel = nextCell.parentNode;
          nextLevel.classList.add("current-level");
          placePlayer(nextCell);
        }
      }
    });
  }
}


function standPlayerAnimation(player) {
  setTimeout(() => { player.src = "./asserts/flash.png" }, 50);
  setInterval(() => {
    if (player.getAttribute("move") == 0) {
      player.src = "./asserts/stand-player.png";
      setTimeout(() => { player.src = "./asserts/moving-player.png" }, 300);
    }
  }, 700);
}
function moveLeftPlayerAnimation(player) {
  player.setAttribute("move", 1)
  let timerId = setInterval(() => {
    player.src = "./asserts/moving-left-player-1.png";
    setTimeout(() => { player.src = "./asserts/moving-left-player-2.png" }, 250);
    setTimeout(() => { player.src = "./asserts/moving-left-player-3.png" }, 500);
  }, 750);
  setTimeout(() => {
    setTimeout(() => { player.src = "./asserts/flash.png" }, 100);
    clearInterval(timerId); player.setAttribute("move", 0);
  }, 2000);

}
function moveRightPlayerAnimation(player) {
  player.setAttribute("move", 1)
  let timerId = setInterval(() => {
    player.src = "./asserts/moving-right-player-1.png";
    setTimeout(() => { player.src = "./asserts/moving-right-player-2.png" }, 250);
    setTimeout(() => { player.src = "./asserts/moving-right-player-3.png" }, 500);
  }, 750);
  setTimeout(() => {
    setTimeout(() => { player.src = "./asserts/flash.png" }, 100);
    clearInterval(timerId); player.setAttribute("move", 0)
  }, 2000);
}

function startNewGame() {
  const workPlace = document.querySelector("main");
  workPlace.innerHTML = "";

  const inptRows = document.querySelector("#rows");
  const rows = inptRows.value;

  const inptColumns = document.querySelector("#columns");
  const columns = inptColumns.value;

  const inptDimensions = document.querySelector("#dimensions");
  const dimensions = inptDimensions.value;

  const cellBorder = "10px solid black";
  const maze = new Maze3d(rows, columns, dimensions);
  const table = new DFSMaze3dGenerator(maze).generate();


  for (let i = 0; i < dimensions; i++) {
    const level = document.createElement("div");
    level.className = "level";
    level.style.gridTemplateColumns = `repeat(${columns}, ${columns}fr)`;
    for (let j = 0; j < rows; j++) {
      for (let k = 0; k < columns; k++) {
        const cell = document.createElement("div");
        cell.className = "cell";
        cell.id = `${i}${j}${k}`;
        const mazeCell = table.maze[i][j][k];

        if (mazeCell.left) {
          cell.style.borderLeft = cellBorder;
        }
        if (mazeCell.right) {
          cell.style.borderRight = cellBorder;
        }
        if (mazeCell.forward) {
          cell.style.borderBottom = cellBorder;
        }
        if (mazeCell.backward) {
          cell.style.borderTop = cellBorder;
        }
        // walls between levels
        if (!mazeCell.up && !mazeCell.down) {
          cell.classList.add("up-down-cell");
        } else if (!mazeCell.up) {
          cell.classList.add("up-cell");
        } else if (!mazeCell.down) {
          cell.classList.add("down-cell");
        }
        if (i == table.start[0] && j == table.start[1] && k == table.start[2]) {
          placePlayer(cell);
          level.classList.add("current-level");
          cell.classList.add("current-cell");
        }
        if (i == table.goal[0] && j == table.goal[1] && k == table.goal[2]) {
          cell.classList.add("goal-cell");
          cell.classList.remove("up-cell", "down-cell", "up-down-cell");
        }


        level.appendChild(cell);
      }
    }
    workPlace.appendChild(level);
  }
  isGame = 1;
  makeMove();
}
















