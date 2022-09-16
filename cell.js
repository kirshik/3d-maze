class Cell {
  #directionsNum = 6;
  /**
   * @param {Boolean} up 
   * @param {Boolean} down 
   * @param {Boolean} left 
   * @param {Boolean} right 
   */
  constructor(place, up = 0, down = 0, forward = 0, backward = 0, left = 0, right = 0) {
    // 1 - for wall, 0 for no wall
    this.up = up;
    this.down = down;
    this.forward = forward;
    this.backward = backward;
    this.left = left;
    this.right = right;
    this.place = place;

  }
  get directionsNum() {
    return this.#directionsNum;
  }
}

export default Cell;
