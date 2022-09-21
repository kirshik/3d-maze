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
  #isFrontierIncludes(data, obj) {
    for (const node of data) {
      if ((data instanceof Set ? node : node.state).equals(obj.state)) {
        return true
      }
    }
    return false;
  }

  #pushNode = (dataStructure, node) => { dataStructure.push(node) };
  #removeNode = (frontier, node) => { return frontier.pop() };

  /**
   * 3d maze solution search function
   * @param {Searchable} problem 
   * @returns false or array of state objects
   */
  search(problem) {
    let frontier = [];
    return super.search(problem, frontier, this.#pushNode, this.#isFrontierIncludes, this.#removeNode);
  }


}
export default DFS;