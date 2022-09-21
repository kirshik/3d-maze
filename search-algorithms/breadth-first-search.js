

class BFS {
  #numberOfNodesEvaluate = 0;
  constructor() {
  }

  #solution(initialState, node) {
    let steps = [];
    steps.push(initialState);
    let arr = node.get(3);
    while (node.get(3) !== undefined) {
      steps.push(node.get(1));
      node = node.get(3);
    }
    return steps;
  }
  #setChildNode(problem, node, action) {
    const childNode = new Map([[1, action], [2, node.get(2) + 1], [3, node]]);
    return childNode;
  }
  search(problem) {
    let node = new Map([[1, problem.initialState], [2, 0], [3, undefined]]);
    if (node.get(1) === problem.goalTest(node.get(1))) {
      return this.#solution(problem.initialState, node);
    }
    let frontier = []; // queue
    let visited = new Set();

    frontier.push(node);

    while (frontier.length > 0) {
      this.#numberOfNodesEvaluate += 1;
      node = frontier.pop(); // pick shallowest node from frontier
      // add node state to explored
      visited.add(node.get(1).toString());

      for (const action of problem.getStateTransitions(node.get(1))) {
        const child = this.#setChildNode(problem, node, action); // node
        if (!frontier.includes(child) && !visited.has(child.get(1).toString())) {
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