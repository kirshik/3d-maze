import Maze3dState from "./maze-3d-state.js";
import Searchable from "./search-algorithms/searchable.js";
import State from "./search-algorithms/state.js";

class Maze3dAdapter extends Searchable {
  constructor(maze) {
    super();
    this.maze = maze;

  }
  #between(end, arg) {
    if (!(arg >= 0 && arg < end)) {
      return false;
    }
    return true;
  }
  getStateTransitions(nodeState) {
    let actions = [];
    const directions = new Map([
      ["up", [-1, 0, 0]],
      ["down", [1, 0, 0]],
      ["forward", [0, 1, 0]],
      ["backward", [0, -1, 0]],
      ["right", [0, 0, 1]],
      ["left", [0, 0, -1]],
    ])
    const cell = this.maze.maze[nodeState.place[0]][nodeState.place[1]][nodeState.place[2]];
    for (const [key, direction] of directions.entries()) {
      const action = [cell.place[0] + direction[0], cell.place[1] + direction[1], cell.place[2] + direction[2]];
      if (this.#between(this.maze.dimensions, action[0])
        && this.#between(this.maze.rows, action[1])
        && this.#between(this.maze.columns, action[2])) {
        switch (key) {
          case "up":
            if (!cell.up) {
              actions.push(new Maze3dState(action));
            };
            break;
          case "down":
            if (!cell.down) {
              actions.push(new Maze3dState(action));
            };
            break;
          case "forward":
            if (!cell.forward) {
              actions.push(new Maze3dState(action));
            };
            break;
          case "backward":
            if (!cell.backward) {
              actions.push(new Maze3dState(action));
            };
            break;
          case "right":
            if (!cell.right) {
              actions.push(new Maze3dState(action));
            };
            break
          case "left":
            if (!cell.left) {
              actions.push(new Maze3dState(action));
            };
            break;
        }
      }
    }
    return actions;
  }
  get initialState() {
    return new Maze3dState(this.maze.start);
  }
  get goalState() {
    return new Maze3dState(this.maze.goal);
  }
  goalTest(nodeState) {
    if (!(nodeState.equals(this.goalState))) {
      return false;
    }
    return true;
  }
}
export default Maze3dAdapter;