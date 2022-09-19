//Prim's algorithm (also known as JarnÃ­k's algorithm) is a greedy algorithm that finds a minimum spanning tree for a weighted undirected graph.

//Psudo code for prim's algorithm

// generate a maze full of walls
// Select a random cell S - the beginning of the algorithm
// designate S as part of the maze and add to list - stack
// while list - stack is not empty:
//      select a random cell Z from the list - stack

//      take a random unvisited neighbor X of cell Z

//      if Z has no unvisited neighbor, remove it from stack - list

//      If X is adjacent to an existing maze in multiple places(shares multiple walls with the maze), break one random wall

//      Designate X as part of the maze and add to the list - stack


import Maze3dGenerator from "./maze-3d-generator.js";

/**
 * class represents Prim's algorith for generate 3d maze 
 */
class PrimsMaze3dGenerator extends Maze3dGenerator {
  /**
   * @param {Maze3d} maze 
   */
  constructor(maze) {
    super(maze);
    this.maze = maze;
  }

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

  breakRandomMazeWalls(cell, maze, visited) {
    let neighbours = new Map();
    const list = this.cellNeighbours(cell, maze);
    for (const [key, neighbour] of list) {
      if (visited.includes(neighbour)) {
        neighbours.set(key, neighbour)
      }
    }
    if (neighbours.size > 0) {
      const [key, mazeCell] = this.getRandomFromMap(neighbours);
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
  /**
   * function for generate 3d maze randomly 
   * @returns {Maze3dGenerator}
   */
  generate() {
    let visited = [];
    let list = [];
    let start = [this.randomInt(this.maze.dimensions), this.randomInt(this.maze.rows), this.randomInt(this.maze.columns)];
    this.maze.start = start;
    let currCell = this.maze.maze[start[0]][start[1]][start[2]];
    visited.push(currCell);
    list.push(currCell);
    while (list.length > 0) {
      currCell = list[this.randomInt(list.length)];
      const buffer = this.unvisitedNeighbours(currCell, this.maze, visited);
      if (buffer.size === 0) {
        list.splice(list.indexOf(currCell), 1);
      } else {
        const unvisitedNeighbour = this.getRandomFromMap(buffer)[1];
        this.breakRandomMazeWalls(unvisitedNeighbour, this.maze, visited);
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