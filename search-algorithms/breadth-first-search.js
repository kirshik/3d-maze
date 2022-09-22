import SearchNode from "./node.js";
import SearchAlgorithm from "./search-algorithm.js";
import State from "./state.js";

/**
 * class represent BFS solver of a 3d maze 
 */
class BFS extends SearchAlgorithm {
  constructor() {
    super();
  }

  /**
   * a function to determine if an object is part of the data
   * @param {Array[State]} frontier 
   * @param {SearchNode} obj 
   * @returns bool
   */
  isIncludesFrontier(data, obj) {
    for (const node of data) {
      if ((data instanceof Set ? node : node.state).equals(obj.state)) {
        return true
      }
    }
    return false;
  }

  removeNode(frontier, node) { return frontier.shift() };

  frontier() {
    return new Array();
  }


  /**
   * 3d maze solution search function
   * @param {Searchable} problem 
   * @returns false or array of state objects
   */
  search(problem) {
    return super.search(problem);
  }


}
export default BFS;