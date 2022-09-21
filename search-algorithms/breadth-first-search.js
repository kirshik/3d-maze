

class BFS {
  #numberOfNodesEvaluate = 0;
  constructor() {
  }

  #solution(initialState, node) {
    let steps = [];
    while (node.get(2) !== undefined) {
      steps.push(node.get(1));
      node = node.get(2);
    }
    steps.push(initialState);
    return steps.reverse();
  }
  #setChildNode(problem, node, action) {
    const childNode = new Map([[1, action], [2, node]]);
    return childNode;
  }
  #includesFrontier(frontier, obj) {
    for (const node of frontier) {
      if (node.get(1).equals(obj.get(1))) {
        return true
      }
    }
    return false;
  }
  #includesVisited(visited, obj) {
    for (const node of visited) {
      if (node.equals(obj.get(1))) {
        return true
      }
    }
    return false;
  }
  search(problem) {
    let node = new Map([[1, problem.initialState], [2, undefined]]);
    if (node.get(1) === problem.goalTest(node.get(1))) {
      return this.#solution(problem.initialState, node);
    }
    let frontier = []; // queue
    let visited = new Set();

    frontier.push(node);

    while (frontier.length > 0) {
      node = frontier.pop(); // pick shallowest node from frontier
      // add node state to explored
      visited.add(node.get(1));
      for (const action of problem.getStateTransitions(node.get(1))) {
        this.#numberOfNodesEvaluate += 1;
        const child = this.#setChildNode(problem, node, action); // node
        // if (!frontier.includes(child) && !visited.has(child.get(1).toString())) {
        if (!this.#includesFrontier(frontier, child) && !this.#includesVisited(visited, child)) {
          if (problem.goalTest(child.get(1))) {
            return this.#solution(problem.initialState, child);
          }
          frontier.push(child)
        }
      }
    }
    return false;
  }
  getNumberOfNodesEvaluated() {
    return this.#numberOfNodesEvaluate;
  }

}
export default BFS;