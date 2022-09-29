import DFSMaze3dGenerator from "./dfs-maze-3d-generator.js";
import Maze3d from "./maze3d.js";
import SearchDemo from "./search-demo.js";

// /**
//   result example:
//     BFS: 224
//     DFS: 24996
//     A*: 219
//  */
// let searchDemo = new SearchDemo();
// console.log(searchDemo.run(50, 50, 6))
const rows = 3;
const columns = 3;
const dimensions = 3;
const cellBorder = "10px solid black"
const maze = new Maze3d(rows, columns, dimensions);
const table = new DFSMaze3dGenerator(maze).generate();
const workPlace = document.querySelector("main");
for (let i = 0; i < dimensions; i++) {
  const level = document.createElement("div");
  level.className = "level";
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
      // moving between levels
      if (!mazeCell.up && !mazeCell.down) {
        cell.classList.add("up-down-cell");
      } else if (!mazeCell.up) {
        cell.classList.add("up-cell");
      } else if (!mazeCell.down) {
        cell.classList.add("down-cell");
      }
      if (i == table.start[0] && j == table.start[1] && k == table.start[2]) {
        cell.textContent = "P";
        level.classList.add("current-level");
      }
      if (i == table.goal[0] && j == table.goal[1] && k == table.goal[2]) {
        cell.classList.add("goal-cell");
      }


      level.appendChild(cell);
    }
  }
  workPlace.appendChild(level);
}















