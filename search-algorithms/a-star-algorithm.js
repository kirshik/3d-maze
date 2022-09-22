import SearchNode from "./node.js";
import PriorityQueue from "./priority-queue.js";
import SearchAlgorithm from "./search-algorithm.js";

//IN PROGRESS

class AStar extends SearchAlgorithm {
  #goal;
  #numberOfNodesEvaluated = 0;
  constructor() {
  }

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

  search(problem) {
    this.#goal = problem.goalState;
    let node = new SearchNode(problem.initialState, undefined, 0);
    let visited = new Set();
    let frontier = new PriorityQueue(this.#goal, this.#heuristic);
    frontier.push(node);
    while (frontier.size() > 0) {
      node = frontier.pop();
      visited.add(node.state);
      if (problem.goalTest(node.state)) {
        return this.solution(problem.initialState, node);
      }
      for (const [action, cost] of this.successor(problem, node)) {
        this.#numberOfNodesEvaluated += 1;
        const child = this.setChildNode(node, action, cost);

        if (!this.#isIncludes(visited, child)) {
          if (!this.isIncludesFrontier(frontier, child)) {
            if (action.equals(this.#goal)) {
              const childNode = this.setChildNode(node, action);
              return this.solution(problem.initialState, childNode);
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
    };
    return false;
  }
  getNumberOfNodesEvaluated() {
    return this.#numberOfNodesEvaluated;
  }
}
export default AStar;