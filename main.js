import DFSMaze3dGenerator from "./dfs-maze-3d-generator.js";
import Maze3dAdapter from "./maze-3d-adapter.js";
import Maze3d from "./maze3d.js";
import PrimsMaze3dGenerator from "./prims-maze-3d-generator.js";
import BFS from "./search-algorithms/breadth-first-search.js";
import SimpleMaze3dGenerator from "./simple-maze-3d-generator.js";


let m1 = new Maze3d(3, 3, 3);


let dfs = new DFSMaze3dGenerator(m1);
const maze = dfs.generate();
console.log(maze.toString());


const adapter = new Maze3dAdapter(maze);
const bfs = new BFS();
console.log(bfs.search(adapter))
console.log(bfs.getNumberOfNodesEvaluated())



// console.log(m1.toString())
// console.log(m1.maze)

// let pg = new PrimsMaze3dGenerator(m1);
// console.log(pg.generate().toString())
// let sg = new SimpleMaze3dGenerator(m1);
// console.log(sg.generate().toString());
// console.log(sg.measureAlgorithmTime());

// // console.log(dfc.measureAlgorithmTime()) 










