import DFSMaze3dGenerator from "./dfs-maze-3d-generator.js";
import Maze3dAdapter from "./maze-3d-adapter.js";
import Maze3d from "./maze3d.js";
import PrimsMaze3dGenerator from "./prims-maze-3d-generator.js";
import AStar from "./search-algorithms/a-star-algorithm.js";
import BFS from "./search-algorithms/breadth-first-search.js";
import DFS from "./search-algorithms/depth-first-search-algorithm.js";
import SimpleMaze3dGenerator from "./simple-maze-3d-generator.js";


let m1 = new Maze3d(25, 25, 3);


let dfs = new DFSMaze3dGenerator(m1);
const maze = dfs.generate();
console.log(maze.toString());


const adapter = new Maze3dAdapter(maze);

const astar = new AStar();
console.log(astar.search(adapter));
console.log(astar.getNumberOfNodesEvaluated());

const bfs = new BFS();
bfs.search(adapter);
console.log(bfs.getNumberOfNodesEvaluated());

const dfsObj = new DFS();
dfsObj.search(adapter);
console.log(dfsObj.getNumberOfNodesEvaluated());













