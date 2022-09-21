class State {
  #key // the state is represented by a string
  constructor(key) {
    if (this.constructor === State) {
      throw new Error('State cannot be initialized');
    }
    this.#key = key;
  }
  get key() {
    return this.#key;
  }
  equals(other) {
    return other instanceof State && this.#key === other.#key;
  }
  toString() {
    throw new Error("toString is abstract method");
  }
}

export default State;