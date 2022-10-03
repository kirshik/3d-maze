import SearchNode from "./node.js";
import Searchable from "./searchable.js";
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
  solution(initialState, node) {
    let steps = [];
    while (node.previousNode !== undefined) {
      steps.push(node.state.toString());
      node = node.previousNode;
    }
    // turn on if you want to have start node in solution

    // steps.push(initialState.toString());
    return steps.reverse();
  }

  /**
 * a function to determine if an object is part of the data
 * @param {Array[State]} frontier 
 * @param {SearchNode} obj 
 * @returns bool
 */
  isIncludes(data, obj) {
    for (const node of data) {
      if ((data instanceof Set ? node : node.state).equals(obj.state)) {
        return true
      }
    }
    return false;
  }
  /**
 * function to create a new child node
 * @param {SearchNode} node 
 * @param {State} action 
 * @returns Map
 */
  setChildNode(node, action) {
    const childNode = new SearchNode(action, node)
    return childNode;
  }

  /**
   * transition function
   * @param {Searchable} problem 
   * @param {SearchNode} node 
   * @returns 
   */
  successor(problem, node) {
    const actions = problem.getStateTransitions(node.state);
    if (actions instanceof Map) {
      return actions;
    } else {
      let newActions = new Map();
      for (const action of actions) {
        newActions.set(action, 0);
      }
      return newActions;
    }
  }

  pushNode(dataStructure, node) { dataStructure.push(node) };

  /**
   * conditions of for loop
   * depends on the algorithm
   * @param {Searchable} problem 
   * @param {*} frontier 
   * @param {SearchNode} child 
   * @param {Set} visited 
   * @returns sulution array / undefined
   */
  forCondition(problem, frontier, child, visited) {
    if (!this.isIncludesFrontier(frontier, child) && !this.isIncludes(visited, child)) {
      if (problem.goalTest(child.state)) {
        return this.solution(problem.initialState, child);
      }
      this.pushNode(frontier, child);
    }
  }

  /**
   * length or size of frontier
   */
  frontierLength(frontier) {
    return frontier.length;
  }

  // abstract classes
  frontier() {
    throw new Error("frontier is abstract method");
  }

  isIncludesFrontier(frontier, node) {
    throw new Error("isIncludesFrontier is abstract method");
  }
  removeNode(frontier) {
    throw new Error("removeNode is abstract method");
  }

  /**
   * 3d maze solution search function
   * @param {Searchable} problem 
   * @returns false or array of state objects
   */
  search(problem) {
    let node = new SearchNode(problem.initialState, undefined, 0)
    // queue
    let frontier = this.frontier();
    let visited = new Set();
    this.pushNode(frontier, node);
    if (node.state === problem.goalTest(node.state)) {
      return this.solution(problem.initialState, node);
    }
    while (this.frontierLength(frontier) > 0) {
      // pick shallowest node from frontier
      node = this.removeNode(frontier);
      // add node state to explored
      visited.add(node.state);

      for (const [action, cost] of this.successor(problem, node)) {
        // count number of evaluated
        this.#numberOfNodesEvaluated += 1;
        // node
        const child = this.setChildNode(node, action, cost);
        const result = this.forCondition(problem, frontier, child, visited);

        // if there is a solution to return
        if (result instanceof Array) {
          return result;
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