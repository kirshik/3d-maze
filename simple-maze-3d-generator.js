// import Cell from "./cell.js";
import Maze3dGenerator from "./maze-3d-generator.js";
import Maze3d from "./maze3d.js";


class SimpleMaze3dGenerator extends Maze3dGenerator {
  /**
   * 
   * @param {Maze3d} maze 
   */
  constructor(maze) {
    super(maze);
    this.maze = maze;
  }

  generate() {
    for (let i = 0; i < this.maze.dimensions; i++) {
      for (let j = 0; j < this.maze.rows; j++) {
        for (let k = 0; k < this.maze.columns; k++) {

          // pointing to cell in maze
          const cell = this.maze.maze[i][j][k];
          const upCell = this.maze.maze[i + 1 < this.maze.dimensions ? i + 1 : i][j][k];
          const downCell = this.maze.maze[i - 1 > 0 ? i - 1 : i][j][k];
          const leftCell = this.maze.maze[i][j][k - 1 > 0 ? k - 1 : k];
          const rightCell = this.maze.maze[i][j][k + 1 < this.maze.columns ? k + 1 : k];
          const forwardCell = this.maze.maze[i][j + 1 < this.maze.rows ? j + 1 : j][k];
          const backwardCell = this.maze.maze[i][j - 1 > 0 ? j - 1 : j][k];

          // randomly creating cells walls
          cell.up = Math.round(Math.random(1));
          cell.down = Math.round(Math.random(1));
          cell.left = Math.round(Math.random(1));
          cell.right = Math.round(Math.random(1));
          cell.forward = Math.round(Math.random(1));
          cell.backward = Math.round(Math.random(1));

          // make sure that the walls of the cells coincide
          upCell.down = cell.up;
          downCell.up = cell.down;
          leftCell.right = cell.left;
          rightCell.left = cell.right;
          forwardCell.backward = cell.forward;
          backwardCell.forward = cell.backward;
        }
      }
    }

    function randomInt(max) {
      return Math.floor(Math.random() * max)
    }

    // randomly create start and goal
    this.maze.start = [randomInt(this.maze.dimensions), randomInt(this.maze.rows), randomInt(this.maze.columns)]
    this.maze.goal = [randomInt(this.maze.dimensions), randomInt(this.maze.rows), randomInt(this.maze.columns)]

    // carve a random path
    let currCell = this.maze.maze[this.maze.start[0]][this.maze.start[1]][this.maze.start[2]]
    while (currCell != this.maze.maze[this.maze.goal[0]][this.maze.goal[1]][this.maze.goal[2]]) {
      let num = randomInt(currCell.directionsNum);
      switch (num) {
        case 0:
          currCell.up = 0;
          currCell = this.maze.maze[currCell.place[0] + 1 < this.maze.dimensions ? currCell.place[0] + 1 : currCell.place[0]][currCell.place[1]][currCell.place[2]];
          break;
        case 1:
          currCell.down = 0;
          currCell = this.maze.maze[currCell.place[0] - 1 > 0 ? currCell.place[0] - 1 : currCell.place[0]][currCell.place[1]][currCell.place[2]];
          break;
        case 2:
          currCell.left = 0;
          currCell = this.maze.maze[currCell.place[0]][currCell.place[1]][currCell.place[2] - 1 > 0 ? currCell.place[2] - 1 : currCell.place[2]];
          break;
        case 3:
          currCell.right = 0;
          currCell = this.maze.maze[currCell.place[0]][currCell.place[1]][currCell.place[2] + 1 < this.maze.columns ? currCell.place[2] + 1 : currCell.place[2]];
          break;
        case 4:
          currCell.forward = 0;
          currCell = this.maze.maze[currCell.place[0]][currCell.place[1] + 1 < this.maze.rows ? currCell.place[1] + 1 : currCell.place[1]][currCell.place[2]];
          break;
        case 5:
          currCell.backward = 0;
          currCell = this.maze.maze[currCell.place[0]][currCell.place[1] - 1 > 0 ? currCell.place[1] - 1 : currCell.place[1]][currCell.place[2]];
          break;
      };

    }
    return this.maze.maze;
  }
}
export default SimpleMaze3dGenerator;