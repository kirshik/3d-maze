
import Maze3dGenerator from "./maze-3d-generator.js";

class DFSMaze3dGenerator extends Maze3dGenerator {
  constructor(maze) {
    super(maze);
    this.maze = maze;
  }
  generate() {
    function randomInt(max) {
      return Math.floor(Math.random() * max);
    }
    function getRandomFromMap(map) {
      let keys = Array.from(map.keys());
      const key = keys[Math.floor(Math.random() * keys.length)];
      const neighbour = map.get(key)
      return [key, neighbour];
    }
    function isUnvisitedNeighbours(cell, maze) {
      let neighbours = new Map();
      for (const [key, direction] of directions.entries()) {
        const conditions = [
          (cell.place[0] + direction[0] < maze.dimensions),
          (cell.place[0] + direction[0] >= 0),
          (cell.place[1] + direction[1] < maze.rows),
          (cell.place[1] + direction[1] >= 0),
          (cell.place[2] + direction[2] < maze.columns),
          (cell.place[2] + direction[2] >= 0)
        ]
        if (!conditions.includes(false)) {
          const neighbour = maze.maze[cell.place[0] + direction[0]][cell.place[1] + direction[1]][cell.place[2] + direction[2]];
          if (!visited.includes(neighbour)) {
            neighbours.set(key, neighbour)
          }
        }
      }
      return neighbours;
    }
    let directions = new Map([
      ["forward", [0, 1, 0]],
      ["backward", [0, -1, 0]],
      ["right", [0, 0, 1]],
      ["left", [0, 0, -1]],
      ["up", [1, 0, 0]],
      ["down", [-1, 0, 0]]
    ])
    let stack = [];
    let start = [randomInt(this.maze.dimensions), randomInt(this.maze.rows), randomInt(this.maze.columns)];
    this.maze.start = start;
    let currentCell = this.maze.maze[start[0]][start[1]][start[2]];
    let visited = [];
    stack.push(currentCell);
    visited.push(currentCell);
    while (stack.length > 0) {
      const unvisitedNeighbours = isUnvisitedNeighbours(currentCell, this.maze);
      if (unvisitedNeighbours.size > 0) {
        const [key, neighbour] = getRandomFromMap(unvisitedNeighbours);
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