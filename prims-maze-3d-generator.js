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
    function getRandomFromMap(map) {
      let keys = Array.from(map.keys());
      const key = keys[Math.floor(Math.random() * keys.length)];
      const neighbour = map.get(key)
      return [key, neighbour];
    }
    function unvisitedNeighbours(cell, maze) {
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
    function breakRandomMazeWalls(cell, maze) {
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
          if (visited.includes(neighbour)) {
            neighbours.set(key, neighbour)
          }
        }
      };
      if (neighbours.size > 0) {
        const [key, mazeCell] = getRandomFromMap(neighbours);
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
      } else {
        return false;
      }
      return true;
    }
    let visited = [];
    let list = [];
    let start = [randomInt(this.maze.dimensions), randomInt(this.maze.rows), randomInt(this.maze.columns)];
    this.maze.start = start;
    let currCell = this.maze.maze[start[0]][start[1]][start[2]];
    visited.push(currCell);
    list.push(currCell);
    while (list.length > 0) {
      currCell = list[randomInt(list.length)];
      const buffer = unvisitedNeighbours(currCell, this.maze);
      if (buffer.size === 0) {
        list.splice(list.indexOf(currCell), 1);
      } else {
        const unvisitedNeighbour = getRandomFromMap(buffer)[1];
        breakRandomMazeWalls(unvisitedNeighbour, this.maze);
        visited.push(unvisitedNeighbour);
        list.push(unvisitedNeighbour);
      }
    }
    let goal = visited.pop().place;
    this.maze.goal = goal;
    return this.maze;
  };
}

export default PrimsMaze3dGenerator;