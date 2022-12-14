import Cell from "./cell.js";

/**
 * class Maze3d represent 3d maze
 */
class Maze3d {

  /**
   * constructor gets the users preferences for rows,
   * columns and dimensions and creates 3d maze where each cell
   * has all the walls
   * @param {number} rows 
   * @param {number} columns 
   * @param {number} dimensions 
   */
  constructor(rows, columns, dimensions) {
    this.dimensions = dimensions;
    this.rows = rows;
    this.columns = columns;
    this.start;
    this.goal;
    this.maze = new Array();

    // fill the maze with cells
    for (let i = 0; i < this.dimensions; i++) {
      let board = [];
      for (let j = 0; j < this.rows; j++) {
        let row = [];
        for (let k = 0; k < this.columns; k++) {
          const cell = new Cell([i, j, k]);
          row.push(cell);
        }
        board.push(row);
      }
      this.maze.push(board);
    }

  }
  /**
   * 
   * @param {Array} currentCell 
   * @param {Array} nextCell 
   */
  isValidMove(currentCell, nextCell) {
    const cell = this.maze[currentCell[0]][currentCell[1]][currentCell[2]];
    const directions = new Map([
      [() => { return cell.up }, [-1, 0, 0]],
      [() => { return cell.down }, [1, 0, 0]],
      [() => { return cell.forward }, [0, 1, 0]],
      [() => { return cell.backward }, [0, -1, 0]],
      [() => { return cell.right }, [0, 0, 1]],
      [() => { return cell.left }, [0, 0, -1]],
    ])
    for (let [key, place] of directions) {
      let sum = currentCell.map((num, idx) => num + place[idx]);
      if (nextCell.toString() === sum.toString()) {
        if (!key()) {
          return true;
        }
      }
    }
    return false;

  }

  /**
   * @returns console representation of the maze
   */
  toString() {
    let total = ''
    for (let i = 0; i < this.dimensions; i++) {
      total += `Level ${i}\n`
      let table = '\t';
      table += "-" + "----".repeat(this.columns) + "\n";
      for (let j = 0; j < this.rows; j++) {
        let row = "\t|";
        table += '\t'
        for (let k = 0; k < this.columns; k++) {
          const cell = this.maze[i][j][k];
          if (cell.left || k === 0) {
            table += "|"
          } else {
            table += " "
          };

          if (i === this.start[0] && j === this.start[1] && k === this.start[2]) {
            table += " S ";
          } else if (i === this.goal[0] && j === this.goal[1] && k === this.goal[2]) {
            table += " G ";
          } else if (!cell.up && !cell.down) {
            table += " \u2b65 "
          } else if (!cell.up) {
            table += ' \u2191 '
          } else if (!cell.down) {
            table += " \u2193 "
          } else if (cell.up && cell.down) {
            table += "   "
          };

          if (k === this.columns - 1) {
            table += "|"
          };

          if (!cell.forward && k === (this.columns - 1)) {
            row += "   |"
          } else if (!cell.forward) {
            row += "   +"
          } else if (k === (this.columns - 1)) {
            row += " - |"
          } else {
            row += " - +"
          };
        }
        row = j < (this.rows - 1) ? row + "\n" : ''
        table += "\n" + row

      }
      table += "\t-" + "----".repeat(this.columns) + "\n";
      total += table + "\n"
      table = "\t"
    };
    return total;

  }
}

export default Maze3d;