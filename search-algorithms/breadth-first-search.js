import SearchNode from "./node.js";
import Node from "./node.js";
import State from "./state.js";

/**
 * class represent BFS solver of a 3d maze 
 */
class BFS {
  #numberOfNodesEvaluated = 0;
  constructor() {
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
   * function to create a new child node
   * @param {Searchable} problem 
   * @param {SearchNode} node 
   * @param {State} action 
   * @returns Map
   */
  #setChildNode(node, action) {
    const childNode = new SearchNode(action, node)
    return childNode;
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
  search(problem) {
    let node = new SearchNode(problem.initialState, undefined)


    // let node = new Map([[1, problem.initialState], [2, undefined]]);


    if (node.state === problem.goalTest(node.state)) {
      return this.#solution(problem.initialState, node);
    }

    // queue
    let frontier = [];
    let visited = new Set();

    frontier.push(node);

    while (frontier.length > 0) {
      // pick shallowest node from frontier
      node = frontier.pop();
      // add node state to explored
      visited.add(node.state);

      for (const action of problem.getStateTransitions(node.state)) {
        // count number of evaluated
        this.#numberOfNodesEvaluated += 1;
        // node
        const child = this.#setChildNode(node, action);

        if (!this.#isIncludes(frontier, child) && !this.#isIncludes(visited, child)) {
          if (problem.goalTest(child.state)) {
            return this.#solution(problem.initialState, child);
          }
          frontier.push(child)
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
export default BFS;