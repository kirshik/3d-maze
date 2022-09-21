import SearchNode from "./node.js";
import PriorityQueue from "./priority-queue.js";
import SearchAlgorithm from "./search-algorithm.js";

//IN PROGRESS

class AStar extends SearchAlgorithm {
  constructor() {
    super();
  }

  #heuristic(problem, node) {
    const goal = problem.goalState.place;
    const current = node.state.place;
    const distance = -Math.sqrt((current[0] - goal[0]) ** 2 + (current[1] - goal[1]) ** 2 + (current[2] - goal[2]) ** 2);
    return distance;

  }

  #setChildNode(node, action) {
    const childNode = new SearchNode(action, node)
    return childNode;
  }

  search(problem) {
    let node = new SearchNode(problem.initialState, undefined, 0);
    let visited = new Set();
    let frontier = new PriorityQueue((node, this.#heuristic(problem, node)));
    super.search();
  }
}