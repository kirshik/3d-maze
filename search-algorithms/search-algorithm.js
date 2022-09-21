import SearchNode from "./node.js";
import State from "./state.js";


class SearchAlgorithm {
  #numberOfNodesEvaluated = 0;
  constructor() {
    if (this.constructor === SearchAlgorithm) {
      throw new Error("SearchAlgorithm is abstract class");
    }
  }
  /**
 * function to output solver steps
 * @param {State.js} initialState 
 * @param {SearchNode.js} node 
 * @returns array of state objects
 */
  #solution(initialState, node) {
    let steps = [];
    while (node.previousNode !== undefined) {
      steps.push(node.state);
      node = node.previousNode;
    }
    steps.push(initialState);
    return steps.reverse();
  }

  /**
 * a function to determine if an object is part of the data
 * @param {Array[State]} frontier 
 * @param {SearchNode} obj 
 * @returns bool
 */
  #isIncludes(data, obj) {
    for (const node of data) {
      if ((data instanceof Set ? node : node.state).equals(obj.state)) {
        return true
      }
    }
    return false;
  }

  /**
   * 3d maze solution search function
   * @param {Searchable} problem 
   * @returns false or array of state objects
   */
  search(problem, frontier, setChildNode, pushNode, isIncludes, removeNode) {
    let node = new SearchNode(problem.initialState, undefined)
    // queue
    let visited = new Set();

    //
    pushNode(frontier, node);
    //


    if (node.state === problem.goalTest(node.state)) {
      return this.#solution(problem.initialState, node);
    }

    while (frontier.length > 0) {
      // pick shallowest node from frontier
      node = removeNode(frontier);
      // add node state to explored
      visited.add(node.state);

      for (const action of problem.getStateTransitions(node.state)) {
        // count number of evaluated
        this.#numberOfNodesEvaluated += 1;
        // node
        const child = setChildNode(node, action);

        if (!isIncludes(frontier, child) && !this.#isIncludes(visited, child)) {
          if (problem.goalTest(child.state)) {
            return this.#solution(problem.initialState, child);
          }
          pushNode(frontier, child);
        }
      }
    }
    return false;
  }


  /**
 * @returns number 
 */
  getNumberOfNodesEvaluated() {
    return this.#numberOfNodesEvaluated;
  }



}
export default SearchAlgorithm;