
import Maze3dGenerator from "./maze-3d-generator.js";

class DFSMaze3dGenerator extends Maze3dGenerator {

  constructor(maze) {
    super(maze);
    this.maze = maze;

  };


  unvisitedNeighbours(cell, maze, visited) {
    let neighbours = new Map();
    const list = this.cellNeighbours(cell, maze);
    for (const [key, neighbour] of list) {
      if (!visited.includes(neighbour)) {
        neighbours.set(key, neighbour)
      }
    }
    return neighbours;
  };


  generate() {
    let stack = [];
    let start = [this.randomInt(this.maze.dimensions), this.randomInt(this.maze.rows), this.randomInt(this.maze.columns)];
    this.maze.start = start;
    let currentCell = this.maze.maze[start[0]][start[1]][start[2]];
    let visited = [];
    stack.push(currentCell);
    visited.push(currentCell);
    while (stack.length > 0) {
      const unvisitedNeighbours = this.unvisitedNeighbours(currentCell, this.maze, visited);
      if (unvisitedNeighbours.size > 0) {
        const [key, neighbour] = this.getRandomFromMap(unvisitedNeighbours);
        switch (key) {
          case "up":
            currentCell.down = 0;
            neighbour.up = 0;
            break;
          case "down":
            currentCell.up = 0;
            neighbour.down = 0;
            break;
          case "forward":
            currentCell.forward = 0;
            neighbour.backward = 0;
            break;
          case "backward":
            currentCell.backward = 0;
            neighbour.forward = 0;
            break;
          case "right":
            currentCell.right = 0;
            neighbour.left = 0;
            break
          case "left":
            currentCell.left = 0;
            neighbour.right = 0;
            break;
        }
        visited.push(neighbour);
        stack.push(neighbour);
        currentCell = neighbour;
      } else {
        currentCell = stack.pop();
      }
    }
    this.maze.goal = visited.pop().place;
    return this.maze;

  }


}


export default DFSMaze3dGenerator;