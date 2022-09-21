import State from "./search-algorithms/state.js";

class Maze3dState extends State {
  #place
  constructor(place) {
    super(place.toString());
    this.#place = place;
  }
  get place() {
    return this.#place;
  }
  toString() {
    return this.#place;
  }
}

export default Maze3dState;