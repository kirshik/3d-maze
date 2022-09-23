import SearchNode from "./node.js";
import PriorityQueue from "./priority-queue.js";
import SearchAlgorithm from "./search-algorithm.js";

//IN PROGRESS

class AStar extends SearchAlgorithm {

  #goal;

  constructor() {
    super();
  }

  /**
   * heuristic function h(s) that estimates how close state s is to the goal
   * @param {SearchNode} node 
   * @param {SearchNode} previousNode 
   * @param {SearchNode} goalNode 
   * @returns boolean
   */
  #heuristic(node, previousNode, goalNode = this.goal) {
    // bullshit, change it
    const goal = goalNode.place;
    const current = node.state.place;
    if (node.state.equals(goalNode)) {
      return true;
    }
    const previous = previousNode.state.place;
    //euclidean distance

    // const distanceCurrentNode = Math.sqrt((current[0] - goal[0]) ** 2 + (current[1] - goal[1]) ** 2 + (current[2] - goal[2]) ** 2);
    // const distancePreviousNode = Math.sqrt((previous[0] - goal[0]) ** 2 + (previous[1] - goal[1]) ** 2 + (previous[2] - goal[2]) ** 2);

    //Manhattan distance
    const distanceCurrentNode = Math.abs(current[0] - goal[0]) + Math.abs(current[1] - goal[1]) + Math.abs(current[2] - goal[2]);
    const distancePreviousNode = Math.abs(previous[0] - goal[0]) + Math.abs(previous[1] - goal[1]) + Math.abs(previous[2] - goal[2]);
    return distanceCurrentNode <= distancePreviousNode;
  }

  /**
   * function to create a new child node
   * @param {SearchNode} node 
   * @param {SearchNode} action 
   * @param {Number} cost 
   * @returns 
   */
  setChildNode(node, action, cost) {
    const nextCost = node.cost + cost;
    const childNode = new SearchNode(action, node, cost)
    childNode.cost = nextCost;
    return childNode;
  }

  /**
   * a function to determine if an object is part of the frontier
   * @param {PriorityQueue} frontier 
   * @param {SearchNode} child 
   * @returns 
   */
  isIncludesFrontier(frontier, child) {
    let cache = frontier;
    const size = cache.size();
    for (let i; i < size; i++) {
      if (cache.pop().state.equals(child.state)) {
        return true;
      }
    }
    return false;

  }

  /**
   * conditions of for loop
   * @param {Searchable} problem 
   * @param {*} frontier 
   * @param {SearchNode} child 
   * @param {Set} visited 
   * @returns sulution array / undefined
   */
  forCondition(problem, frontier, child, visited) {
    if (!this.isIncludes(visited, child)) {
      if (!this.isIncludesFrontier(frontier, child)) {
        if (problem.goalTest(child.state)) {
          return this.solution(problem.initialState, child);
        }
        this.pushNode(frontier, child);
      } else if (frontier.size() > 0) {
        const lastNode = frontier.pop();
        if (this.#heuristic(child, lastNode)) {
          frontier.push(child);
        } else {
          frontier.push(lastNode);
        }
      }
    }
  }
  frontier() { return new PriorityQueue(this.#goal, this.#heuristic) };

  frontierLength(frontier) { return frontier.size() };

  removeNode(frontier, node) { return frontier.pop() };

  /**
   * 3d maze solution search function
   * @param {Searchable} problem 
   * @returns false / array of state objects
   */
  search(problem) {
    this.#goal = problem.goalState;
    return super.search(problem);
  };

}
export default AStar;