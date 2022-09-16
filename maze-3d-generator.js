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
  }
  generate() {
    throw new Error("method must be implemented");
  }
  measureAlgorithmTime() {
    throw new Error("method must be implemented")
  }
}
export default Maze3dGenerator;