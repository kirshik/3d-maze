import DFSMaze3dGenerator from "./dfc-maze-3d-generator.js";
import Maze3d from "./maze3d.js";
import SimpleMaze3dGenerator from "./simple-maze-3d-generator.js";

let m1 = new Maze3d(2, 2, 2);

// console.log(m1.toString())
// console.log(m1.maze)


let sg = new SimpleMaze3dGenerator(m1);
console.log(sg.generate().toString());
console.log(sg.maze.maze)
// let dfs = new DFSMaze3dGenerator(m1);
// console.log()
//

// console.log(sg.measureAlgorithmTime());
// console.log(dfs.generate().toString());
// // console.log(dfc.measureAlgorithmTime())










