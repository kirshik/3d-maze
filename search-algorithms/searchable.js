class Searchable {
  constructor() {
    if (this.constractor === Searchable) {
      throw new Error("Searchable is abstract class");
    }
  }

  /**
   * return data structure of actions  
   * @param {State} nodeState 
   */
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
    if (!(nodeState.equals(this.goalState))) {
      return false;
    }
    return true;
  }
}
export default Searchable;