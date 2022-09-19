import Maze3dGenerator from "./maze-3d-generator.js";
import Maze3d from "./maze3d.js";

/**
 * SimpleMaze3dGenerator represents random maze generator
 */
class SimpleMaze3dGenerator extends Maze3dGenerator {
  /**
   * @param {Maze3d} maze 
   */
  constructor(maze) {
    super(maze);
    this.maze = maze;
  }

  /**
   * find distance between point using sqrt((x1 - x2)**2 + (y1- y2)**2 ...)
   * @param {Array} source 
   * @param {Array} target 
   */
  distanceBetweenCells(source, target) {
    const distance = Math.sqrt((source[0] - target[0]) ** 2 + (source[1] - target[1]) ** 2 + (source[2] - target[2]) ** 2);
    return distance;
  }

  generate() {
    for (let i = 0; i < this.maze.dimensions; i++) {
      for (let j = 0; j < this.maze.rows; j++) {
        for (let k = 0; k < this.maze.columns; k++) {

          // pointing to cell in maze
          const cell = this.maze.maze[i][j][k];
          const downCell = i + 1 < this.maze.dimensions ? this.maze.maze[i + 1][j][k] : {};
          const upCell = i - 1 >= 0 ? this.maze.maze[i - 1][j][k] : {};
          const leftCell = k - 1 >= 0 ? this.maze.maze[i][j][k - 1] : {};
          const rightCell = k + 1 < this.maze.columns ? this.maze.maze[i][j][k + 1] : {};
          const forwardCell = j + 1 < this.maze.rows ? this.maze.maze[i][j + 1][k] : {};
          const backwardCell = j - 1 >= 0 ? this.maze.maze[i][j - 1][k] : {};

          // randomly creating cells walls
          cell.up = (i === 0) ? 1 : Math.round(Math.random(1));
          cell.down = (i === (this.maze.dimensions - 1)) ? 1 : Math.round(Math.random(1));
          cell.left = k === 0 ? 1 : Math.round(Math.random(1));
          cell.right = k === (this.maze.columns - 1) ? 1 : Math.round(Math.random(1));
          cell.forward = j === 0 ? 1 : Math.round(Math.random(1));
          cell.backward = j === (this.maze.rows - 1) ? 1 : Math.round(Math.random(1));

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


    // randomly create start and goal
    this.maze.start = this.createRandomPoint(this.maze);
    this.maze.goal = this.createRandomPoint(this.maze);
    // while start === goal
    while (this.maze.start[0] === this.maze.goal[0] && this.maze.start[1] === this.maze.goal[1] && this.maze.start[2] === this.maze.goal[2]) {
      this.maze.goal = this.createRandomPoint(this.maze);
    };

    // carve a random path
    let currCell = this.maze.maze[this.maze.start[0]][this.maze.start[1]][this.maze.start[2]]
    let nextCell;
    // while curr cell != goal cell
    while (currCell != this.maze.maze[this.maze.goal[0]][this.maze.goal[1]][this.maze.goal[2]]) {
      const neighbours = this.cellNeighbours(currCell, this.maze);
      const [key, nextCell] = this.getRandomFromMap(neighbours);

      // if distance between next randow cell and goal less then distance between current cell and
      // goal then make this move and broke the wall
      if (this.distanceBetweenCells(currCell.place, this.maze.goal) >= this.distanceBetweenCells(nextCell.place, this.maze.goal)) {
        this.breakWall(key, currCell, nextCell);
        currCell = nextCell;
      }
    }
    return this.maze;
  }
}
export default SimpleMaze3dGenerator;