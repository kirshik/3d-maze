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
    let startTime = performance.now()
    this.generate()
    let endTime = performance.now()
    return Math.round((endTime - startTime) * 100) / 100
  }
}
export default Maze3dGenerator;