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

  /**
   * 
   * @param {Cell} cell 
   * @param {Maze3d} maze 
   * @param {Array} visited 
   * @returns map of unvisited neighbours 
   * where key = direction, value = Cell object
   */
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


  /**
   * function that break random wall 
   * between the cell and the current maze
   * @param {Cell} cell 
   * @param {Maze3d} maze 
   * @param {Array} visited 
   * @returns boolean  
   */
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
      this.breakWall(key, cell, mazeCell);
    } else {
      return false;
    }
    return true;
  }

  /**
   * function for generate 3d maze by using Primes algorithm
   * @returns {Maze3dGenerator}
   */
  generate() {

    let visited = [];
    let list = [];
    // pick start cell randomly
    let start = [this.randomInt(this.maze.dimensions), this.randomInt(this.maze.rows), this.randomInt(this.maze.columns)];
    this.maze.start = start;
    // make currCell start cell
    let currCell = this.maze.maze[start[0]][start[1]][start[2]];

    // mark cell as visited
    visited.push(currCell);
    list.push(currCell);


    while (list.length > 0) {

      // select a random adjacent cell
      currCell = list[this.randomInt(list.length)];
      //create a list of unvisited neighbours
      const buffer = this.unvisitedNeighbours(currCell, this.maze, visited);

      // if there are no unvisited neighbors, then remove the cell from the list
      if (buffer.size === 0) {
        list.splice(list.indexOf(currCell), 1);
      } else {
        // randomly select an unvisited neighbor from a list of unvisited neighbors
        // and break a random wall between an uninvited neighbor and the current maze
        const unvisitedNeighbour = this.getRandomFromMap(buffer)[1];
        this.breakRandomMazeWalls(unvisitedNeighbour, this.maze, visited);

        // mark cell as visited
        visited.push(unvisitedNeighbour);
        list.push(unvisitedNeighbour);
      }
    }
    // assign goal to last visited cell
    let goal = visited.pop().place;
    this.maze.goal = goal;

    return this.maze;
  };
}

export default PrimsMaze3dGenerator;