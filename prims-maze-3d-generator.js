//Prim's algorithm (also known as JarnÃ­k's algorithm) is a greedy algorithm that finds a minimum spanning tree for a weighted undirected graph.
import Maze3dGenerator from "./maze-3d-generator.js";

class PrimsMaze3dGenerator extends Maze3dGenerator {
  constructor(maze) {
    super(maze);
    this.maze = maze;
  }
  generate() {
    function randomInt(max) {
      return Math.floor(Math.random() * max);
    }
    let directions = new Map([
      ["up", [1, 0, 0]],
      ["down", [-1, 0, 0]],
      ["forward", [0, 1, 0]],
      ["backward", [0, -1, 0]],
      ["right", [0, 0, 1]],
      ["left", [0, 0, -1]],
    ])
    let start = [randomInt(this.maze.dimensions), randomInt(this.maze.rows), randomInt(this.maze.columns)];
    this.maze.start = start;

    // let goal = [randomInt(this.maze.dimensions), randomInt(this.maze.rows), randomInt(this.maze.columns)];
    // this.maze.goal = goal;


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

    return this.maze;
  };
}

export default PrimsMaze3dGenerator;