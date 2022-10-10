// __author__ = "Kirill Shiriaev https://github.com/kirshik/3d-maze/"
// __copyright__ = "Copyright (C) 2022 Kirill Shiriaev"
// __license__ = "Public Domain"
// __version__ = "1.0"
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