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
   * @param {State.js} node 
   * @returns array of state objects
   */
  #solution(initialState, node) {
    let steps = [];
    while (node.get(2) !== undefined) {
      steps.push(node.get(1));
      node = node.get(2);
    }
    steps.push(initialState);
    return steps.reverse();
  }

  /**
   * function to create a new child node
   * @param {Searchable} problem 
   * @param {State} node 
   * @param {State} action 
   * @returns Map
   */
  #setChildNode(problem, node, action) {
    const childNode = new Map([[1, action], [2, node]]);
    return childNode;
  }

  /**
   * a function to determine if an object is part of the data
   * @param {Array[State]} frontier 
   * @param {Map} obj 
   * @returns bool
   */
  #isIncludes(data, obj) {
    for (const node of data) {
      if ((data instanceof Set ? node : node.get(1)).equals(obj.get(1))) {
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
    let node = new Map([[1, problem.initialState], [2, undefined]]);

    if (node.get(1) === problem.goalTest(node.get(1))) {
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
      visited.add(node.get(1));

      for (const action of problem.getStateTransitions(node.get(1))) {
        // count number of evaluated
        this.#numberOfNodesEvaluated += 1;
        // node
        const child = this.#setChildNode(problem, node, action);

        if (!this.#isIncludes(frontier, child) && !this.#isIncludes(visited, child)) {
          if (problem.goalTest(child.get(1))) {
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