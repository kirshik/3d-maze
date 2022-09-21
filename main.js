import DFSMaze3dGenerator from "./dfs-maze-3d-generator.js";
import Maze3dAdapter from "./maze-3d-adapter.js";
import Maze3d from "./maze3d.js";
import PrimsMaze3dGenerator from "./prims-maze-3d-generator.js";
import BFS from "./search-algorithms/breadth-first-search.js";
import DFS from "./search-algorithms/depth-first-search-algorithm.js";
import SimpleMaze3dGenerator from "./simple-maze-3d-generator.js";


let m1 = new Maze3d(10, 10, 4);


let dfs = new DFSMaze3dGenerator(m1);
const maze = dfs.generate();
console.log(maze.toString());


const adapter = new Maze3dAdapter(maze);

const bfs = new BFS();
console.log(bfs.search(adapter));
console.log(bfs.getNumberOfNodesEvaluated());

const dfsObj = new DFS();
console.log(dfsObj.search(adapter));
console.log(dfsObj.getNumberOfNodesEvaluated());













