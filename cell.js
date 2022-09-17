class Cell {
  #directionsNum = 6;
  /**
   * @param {Boolean} up 
   * @param {Boolean} down 
   * @param {Boolean} left 
   * @param {Boolean} right 
   */
  constructor(place, up = 1, down = 1, forward = 1, backward = 1, left = 1, right = 1) {
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
