
import Maze3dGenerator from "./maze-3d-generator.js";

/**
 * class DFS represent DFS maze generator 
 */
class DFSMaze3dGenerator extends Maze3dGenerator {

  constructor(maze) {
    super(maze);
    this.maze = maze;

  };

  /**
   * function to create a list of unvisited neighbors
   * @param {Cell} cell 
   * @param {Maze3d} maze 
   * @param {Array} visited 
   * @returns 
   */
  unvisitedNeighbours(cell, maze, visited) {
    let neighbours = new Map();
    // gets a list of all neighbours
    const list = this.cellNeighbours(cell, maze);
    // walk through the list and identify unvisited neighbors
    for (const [key, neighbour] of list) {
      if (!visited.includes(neighbour)) {
        neighbours.set(key, neighbour)
      }
    }
    return neighbours;
  };


  /**
   * function for generate 3d maze by using DFS algorithm
   * @returns {Maze3dGenerator}
   */
  generate() {
    // choose start cell
    let start = this.createRandomPoint(this.maze);
    this.maze.start = start;
    // set start cell as current cell
    let currentCell = this.maze.maze[start[0]][start[1]][start[2]];

    let stack = [];
    let visited = [];
    // mark cell as visited and push to the stack
    visited.push(currentCell);
    stack.push(currentCell);

    while (stack.length > 0) {
      // create a list of uvisited neighbours
      const unvisitedNeighbours = this.unvisitedNeighbours(currentCell, this.maze, visited);

      if (unvisitedNeighbours.size > 0) {
        // pick random neighbour cell 
        const [key, neighbour] = this.getRandomFromMap(unvisitedNeighbours);
        // break wall betweeb current cell and choosen one
        this.breakWall(key, currentCell, neighbour);

        // mark cell as visited and add to the stack
        visited.push(neighbour);
        stack.push(neighbour);
        currentCell = neighbour;
      } else {
        currentCell = stack.pop();
      }
    }
    // assign last visited cell as goal cell
    this.maze.goal = visited.pop().place;
    return this.maze;

  }


}


export default DFSMaze3dGenerator;