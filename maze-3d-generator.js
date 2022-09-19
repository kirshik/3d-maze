import Maze3d from "./maze3d.js";

class Maze3dGenerator {

  /**
   * @param {Maze3d} maze 
   */
  constructor(maze) {
    if (this.constructor === Maze3dGenerator) {
      throw new Error("Maze3dGenerator is abstract class");
    }
    this.maze = maze;
    this.directions = new Map([
      ["up", [1, 0, 0]],
      ["down", [-1, 0, 0]],
      ["forward", [0, 1, 0]],
      ["backward", [0, -1, 0]],
      ["right", [0, 0, 1]],
      ["left", [0, 0, -1]],
    ])
  }
  generate() {
    throw new Error("method must be implemented");
  }
  randomInt(max) {
    return Math.floor(Math.random() * max);
  }
  cellNeighbours(cell, maze) {
    let neighbours = new Map();
    for (const [key, direction] of this.directions.entries()) {
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
        neighbours.set(key, neighbour);
      }
    }
    return neighbours;
  }
  getRandomFromMap(map) {
    let keys = Array.from(map.keys());
    const key = keys[Math.floor(Math.random() * keys.length)];
    const neighbour = map.get(key)
    return [key, neighbour];
  }
  measureAlgorithmTime() {
    let startTime = performance.now();
    this.generate();
    let endTime = performance.now();
    return Math.round((endTime - startTime) * 100) / 100
  }
}
export default Maze3dGenerator;