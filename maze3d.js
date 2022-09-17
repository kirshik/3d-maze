import Cell from "./cell.js";


class Maze3d {

  constructor(rows, columns, dimensions) {
    this.dimensions = dimensions;
    this.rows = rows;
    this.columns = columns;
    this.start;
    this.goal;
    this.maze = new Array();

    for (let i = 0; i < this.dimensions; i++) {
      let board = [];
      for (let j = 0; j < this.rows; j++) {
        let row = [];
        for (let k = 0; k < this.columns; k++) {
          const cell = new Cell([i, j, k], 1, 1, 1, 1, 1, 1);
          row.push(cell);
        }
        board.push(row);
      }
      this.maze.push(board);
    }

  }
  toString() {
    let total = ''
    for (let i = 0; i < this.dimensions; i++) {
      total += `Level ${i}\n`
      let table = '\t';
      table += "_".repeat(this.columns * 3) + "\n";
      for (let j = 0; j < this.rows; j++) {
        let row = "\t";
        table += '\t'
        for (let k = 0; k < this.columns; k++) {
          const cell = this.maze[i][j][k];
          const rightCell = k + 1 < this.columns ? this.maze[i][j][k + 1] : false;
          if (cell.left || k === 0) {
            table += "|"
          } else {
            table += " "
          };

          if (i === this.start[0] && j === this.start[1] && k === this.start[2]) {
            table += "S";
          } else if (i === this.goal[0] && j === this.goal[1] && k === this.goal[2]) {
            table += "G";
          } else if (cell.up && cell.down) {
            table += "\u2b65"
          } else if (cell.up) {
            table += '\u2191'
          } else if (cell.down) {
            table += "\u2193"
          } else if (!cell.up && !cell.down) {
            table += " "
          };

          if (k === this.columns - 1) {
            table += "|"
          } else {
            table += " "
          };

          if (cell.forward) {
            row += " + "
          } else {
            row += " - "
          };
        }
        row = j < (this.rows - 1) ? row + "\n" : ''
        table += "\n" + row

      }
      table += "\t" + "_".repeat(this.columns * 3) + "\n";
      total += table + "\n"
      table = "\t"
    };
    return total;

  }
}

export default Maze3d;