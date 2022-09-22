import SearchNode from "./node.js";
import PriorityQueue from "./priority-queue.js";
import SearchAlgorithm from "./search-algorithm.js";

//IN PROGRESS

class AStar extends SearchAlgorithm {
  #goal;
  constructor() {
    super();
  }

  #heuristic(node, previousNode) {
    const goal = this.#goal.place;
    const current = node.state.place;
    const previous = previousNode.state.place;
    const distanceCurrentNode = Math.sqrt((current[0] - goal[0]) ** 2 + (current[1] - goal[1]) ** 2 + (current[2] - goal[2]) ** 2);
    const distancePreviousNode = Math.sqrt((previous[0] - goal[0]) ** 2 + (previous[1] - goal[1]) ** 2 + (previous[2] - goal[2]) ** 2);
    return distanceCurrentNode < distancePreviousNode;
  }
  solution(initialState, node) {
    let steps = [];
    while (node.previousNode !== undefined) {
      steps.push(node.state.toString());
      node = node.previousNode;
    }
    steps.push(initialState.toString());
    return steps.reverse();
  }
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

  setChildNode(node, action, cost) {
    const nextCost = node.cost + cost;
    const childNode = new SearchNode(action, node, cost)
    childNode.cost = nextCost;
    return childNode;
  }
  #isIncludes(data, obj) {
    for (const node of data) {
      if ((data instanceof Set ? node : node.state).equals(obj.state)) {
        return true
      }
    }
    return false;
  }
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
  pushNode(frontier, child) {
    frontier.push(child);
  }

  search(problem) {
    this.#goal = problem.goalState;
    let node = new SearchNode(problem.initialState, undefined, 0);
    let visited = new Set();
    let frontier = new PriorityQueue(this.#heuristic);
    frontier.push(node);
    while (frontier.size() > 0) {
      node = frontier.pop();
      visited.add(node.state);
      if (problem.goalTest(node.state)) {
        return this.solution(problem.initialState, node);
      }

      for (const [action, cost] of this.successor(problem, node)) {
        const child = this.setChildNode(node, action, cost);
        if (!this.isIncludesFrontier(frontier, child) && !this.#isIncludes(visited, child)) {
          this.pushNode(frontier, child);
        } else if (frontier.size() > 0) {
          const lastNode = frontier.pop();
          if (this.#heuristic(child, lastNode)) {
            frontier.push(child);
          } else {
            frontier.push(lastNode)
          }
        }
      }
    };
    return false;
  }
}
export default AStar;