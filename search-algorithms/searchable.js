class Searchable {
  constructor() {
    if (this.constractor === Searchable) {
      throw new Error("Searchable is abstract class");
    }
  }
  getStateTransitions(nodeState) {
    throw new Error("actions is abstract method");
  }
  get initialState() {
    throw new Error("initialState is abstract method");
  }
  get goalState() {
    throw new Error("goalState is abstract method");
  }
  goalTest(nodeState) {
    if (!(nodeState.toString() === this.goalState.toString())) {
      return false;
    }
    return true;
  }
}
export default Searchable;