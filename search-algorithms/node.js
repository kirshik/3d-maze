/**
 * represent node of search algorithm
 */
class SearchNode {
  constructor(state, previousNode, cost = 1) {
    this.state = state;
    this.previousNode = previousNode;
    this.cost = cost;
  }
}
export default SearchNode;