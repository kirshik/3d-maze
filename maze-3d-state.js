import State from "./search-algorithms/state.js";

class Maze3dState extends State {
  #maze
  constructor(maze) {
    super(maze);
    this.#maze = maze;
  }
  get maze() {
    return this.#maze;
  }
}

export default Maze3dState;