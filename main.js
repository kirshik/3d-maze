import DFSMaze3dGenerator from "./dfc-maze-3d-generator.js";
import Maze3d from "./maze3d.js";
import SimpleMaze3dGenerator from "./simple-maze-3d-generator.js";

let m1 = new Maze3d(3, 3, 3);
let sg = new SimpleMaze3dGenerator(m1);
let dfc = new DFSMaze3dGenerator(m1);

//   console.log(sg.generate());
// console.log(sg.maze.toString());
// console.log(sg.measureAlgorithmTime());
console.log(dfc.generate().toString());










