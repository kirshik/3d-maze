import Searchable from "./search-algorithms/searchable.js";

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
    const cell = this.maze.maze[nodeState[0]][nodeState[1]][nodeState[2]];
    for (const [key, direction] of directions.entries()) {
      const action = [cell.place[0] + direction[0], cell.place[1] + direction[1], cell.place[2] + direction[2]];
      if (this.#between(this.maze.dimensions, action[0])
        && this.#between(this.maze.rows, action[1])
        && this.#between(this.maze.columns, action[2])) {
        switch (key) {
          case "up":
            if (!cell.up) {
              actions.push(action);
            };
            break;
          case "down":
            if (!cell.down) {
              actions.push(action);
            };
            break;
          case "forward":
            if (!cell.forward) {
              actions.push(action);
            };
            break;
          case "backward":
            if (!cell.backward) {
              actions.push(action);
            };
            break;
          case "right":
            if (!cell.right) {
              actions.push(action);
            };
            break
          case "left":
            if (!cell.left) {
              actions.push(action);
            };
            break;
        }
      }
    }
    return actions;
  }
  get initialState() {
    return this.maze.start;
  }
  get goalState() {
    return this.maze.goal;
  }
  goalTest(nodeState) {

    if (!(nodeState.toString() === this.goalState.toString())) {
      return false;
    }
    return true;
  }
}
export default Maze3dAdapter;