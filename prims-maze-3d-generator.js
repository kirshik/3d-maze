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

    let goal = [randomInt(this.maze.dimensions), randomInt(this.maze.rows), randomInt(this.maze.columns)];
    this.maze.goal = goal;
    return this.maze;
  };
}

export default PrimsMaze3dGenerator;