// __author__ = "Kirill Shiriaev https://github.com/kirshik/3d-maze/"
// __copyright__ = "Copyright (C) 2022 Kirill Shiriaev"
// __license__ = "Public Domain"
// __version__ = "1.0"
import Maze3d from "./maze3d.js";

/**
 * Abstract class represents any maze generator
 */
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

  /**
   * Abstract method represents random maze generator 
   */
  generate() {
    throw new Error("method must be implemented");
  }

  /**
   * @param {number} max 
   * @returns random number from 0 to max
   */
  randomInt(max) {
    return Math.floor(Math.random() * max);
  }

  /**
   * function to determine all cell neighbors and their directions 
   * @param {Cell} cell 
   * @param {Maze3d} maze 
   * @returns Map of all cell neighbours 
   */
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

  /**
   * a function to pick a random key-value of the map
   * @param {Map} map 
   * @returns Array [key, value]
   */
  getRandomFromMap(map) {
    let keys = Array.from(map.keys());
    const key = keys[Math.floor(Math.random() * keys.length)];
    const neighbour = map.get(key)
    return [key, neighbour];
  }

  /**
   * a function that destroys the wall between two cells
   * @param {string} key 
   * @param {Cell} cell 
   * @param {Cell} mazeCell 
   */
  breakWall(key, cell, mazeCell) {
    switch (key) {
      case "up":
        cell.down = 0;
        mazeCell.up = 0;
        break;
      case "down":
        cell.up = 0;
        mazeCell.down = 0;
        break;
      case "forward":
        cell.forward = 0;
        mazeCell.backward = 0;
        break;
      case "backward":
        cell.backward = 0;
        mazeCell.forward = 0;
        break;
      case "right":
        cell.right = 0;
        mazeCell.left = 0;
        break
      case "left":
        cell.left = 0;
        mazeCell.right = 0;
        break;
    }
  }

  /**
   * choose random cell in the board
   * @param {Maze3d} maze 
   * @returns Array of start/goal cell place
   */
  createRandomPoint(maze) {
    return [this.randomInt(maze.dimensions), this.randomInt(maze.rows), this.randomInt(maze.columns)];
  }

  /**
   * @returns number rounded to tenths
   */
  measureAlgorithmTime() {
    let startTime = performance.now();
    this.generate();
    let endTime = performance.now();
    return Math.round((endTime - startTime) * 100) / 100
  }
}
export default Maze3dGenerator;