import SearchNode from "./node.js";
import SearchAlgorithm from "./search-algorithm.js";
import State from "./state.js";

/**
 * class represent BFS solver of a 3d maze 
 */
class DFS extends SearchAlgorithm {
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
  removeNode(frontier, node) { return frontier.pop() };

  frontier() { return new Array(); };

}
export default DFS;