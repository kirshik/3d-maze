/**
 * represent node of search algorithm
 */
class SearchNode {
  constructor(state, previousNode) {
    this.state = state;
    this.previousNode = previousNode;
  }
}
export default SearchNode;