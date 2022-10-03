
import Maze3d from "./maze3d.js";
import Maze3dAdapter from "./maze-3d-adapter.js"
import DFSMaze3dGenerator from "./dfs-maze-3d-generator.js";
import AStar from "./search-algorithms/a-star-algorithm.js";
import BFS from "./search-algorithms/breadth-first-search.js";
import DFS from "./search-algorithms/depth-first-search-algorithm.js";

class SearchDemo {
  constructor() { };
  #testSearchAlgorithm(searchAlgo, searchable) {
    const solution = searchAlgo.search(searchable);
    const numOfNodes = searchAlgo.getNumberOfNodesEvaluated();
    return numOfNodes;
  }
  run(mazeRows, mazeColumns, mazeDimensions) {
    let maze = new Maze3d(mazeRows, mazeColumns, mazeDimensions);
    let dfs = new DFSMaze3dGenerator(maze);
    const generatedMaze = dfs.generate();
    const adapter = new Maze3dAdapter(generatedMaze);
    const bfsSearch = this.#testSearchAlgorithm(new BFS(), adapter);
    const dfsSearch = this.#testSearchAlgorithm(new DFS(), adapter);
    const astarSearch = this.#testSearchAlgorithm(new AStar(), adapter);

    return `Search speed:\n BFS: ${bfsSearch}\n DFS: ${dfsSearch}\n A*: ${astarSearch}\n`
  }
}
export default SearchDemo;