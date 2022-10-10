import DFSMaze3dGenerator from './dfs-maze-3d-generator.js';
import Maze3d from './maze3d.js';
import AStar from './search-algorithms/a-star-algorithm.js';
import Maze3dAdapter from "./maze-3d-adapter.js";




class Widget {
  // class variables
  #isGame = 0;
  #table;
  #inptName;

  constructor(cellsBackgroundColor, pathPlayerImage, borderColor) {
    this.cellsBackgroundColor = cellsBackgroundColor;
    this.pathPlayerImage = pathPlayerImage;
    this.borderColor = borderColor;
    this.#inptName = document.querySelector('#name');
    // color settings
    // document.documentElement.style.setProperty('--your-variable', '#YOURCOLOR');

    //buttons
    const startNewGameButton = document.querySelector('#start').addEventListener('click', () => { this.startNewGame() });
    const ResetPositionButton = document.querySelector('#reset').addEventListener('click', () => { this.resetPosition() });
    const showSolutionButton = document.querySelector('#solution').addEventListener('click', () => { this.showSolution() });
    const GetHintButton = document.querySelector('#hint').addEventListener('click', () => { this.getHint() });
    const saveMazeGameButton = document.querySelector('#save-maze').addEventListener('click', () => { this.startNewGame() });
    const loadMazeGameButton = document.querySelector('#load-maze').addEventListener('click', () => { this.startNewGame() });
    const showRulesButton = document.querySelector('#show-rules').addEventListener('click', () => { this.showRules() });
  }

  /**
   * function to define validity of move
   * @param {Array} currentCellId 
   * @param {Array} nextCellId 
   * @returns bool true/false
   */
  isValidMove(currentCellId, nextCellId) {
    const next = [Number(nextCellId[0]), Number(nextCellId[1]), Number(nextCellId[2])];
    const current = [Number(currentCellId[0]), Number(currentCellId[1]), Number(currentCellId[2])];
    return this.#table.isValidMove(current, next);
  }

  /**
   * animation of player
   * @param {HTMLElement Object} player 
   */
  standPlayerAnimation(player) {
    setTimeout(() => { player.src = './asserts/flash.png' }, 25);
    setInterval(() => {
      if (player.getAttribute('move') == 0) {
        player.src = './asserts/stand-player.png';
        setTimeout(() => { player.src = './asserts/moving-player.png' }, 300);
      }
    }, 600);
  }

  /**
   * place player in cell
   * @param {HTMLElement Object} cell 
   */
  placePlayer(cell) {
    const player = document.createElement('img');
    player.id = 'player';
    player.setAttribute('move', 0);
    this.standPlayerAnimation(player);
    cell.appendChild(player);
  }

  /**
   * change current cell and level depending of move
   * place player to next cell if move is valid
   * @param {String} move 
   * @param {HTMLElement Object} currCell 
   * @param {String} currCellId 
   */
  handleMove(move, currCell, currCellId) {
    if (this.isValidMove(currCellId, move)) {
      currCell.classList.remove('current-cell');
      currCell.removeChild(document.getElementById('player'));
      const currentLevel = document.querySelector('.current-level');
      currentLevel.classList.remove('current-level');

      const nextCell = document.getElementById(move);
      nextCell.classList.add('current-cell');
      const nextLevel = nextCell.parentNode;
      nextLevel.classList.add('current-level');
      this.placePlayer(nextCell);
    }
  }


  winAction(move) {
    if (move === `${this.#table.goal[0]}${this.#table.goal[1]}${this.#table.goal[2]}`) {
      const game = document.getElementById("game");
      const background = document.querySelector(".background");

      game.style.opacity = "0.5";

      const winDiv = document.createElement("div");
      const p = document.createElement("p");
      p.className = "gradient-text";
      p.textContent = "You WIN!";
      winDiv.id = 'win-div';
      winDiv.appendChild(p);

      const btnDiv = document.createElement("div");
      btnDiv.id = "win-btn-div";


      const btnClose = document.createElement("button");
      btnClose.className = 'win-btn';
      btnClose.textContent = "close";
      btnClose.id = 'win-close';
      const btnSave = document.createElement("button");
      btnSave.className = 'win-btn';
      btnSave.textContent = "Save Maze";
      btnSave.id = 'win-save-maze';
      const btnStartNewGame = document.createElement("button");
      btnStartNewGame.className = 'win-btn';
      btnStartNewGame.textContent = "Start new Game";
      btnStartNewGame.id = 'win-start-game';
      btnDiv.appendChild(btnSave);
      btnDiv.appendChild(btnStartNewGame);
      btnDiv.appendChild(btnClose);
      winDiv.appendChild(btnDiv);

      background.appendChild(winDiv);

      // handle buttons
      function removeWin() {
        background.removeChild(winDiv);
        game.style.opacity = "1";
      }
      document.querySelector('#win-close').addEventListener('click', () => { removeWin() });
      document.querySelector('#win-start-game').addEventListener('click', () => {
        removeWin();
        this.startNewGame();
      });
      document.querySelector('#win-save-maze').addEventListener('click', () => { });
    }
  }
  /**
   * handle click and keyboard event 
   */
  makeMove() {
    if (this.#isGame) {
      // handle move by click
      const workPlace = document.querySelector("main")
      workPlace.addEventListener("click", (e) => {
        const currCell = document.querySelector('.current-cell');
        const currCellId = currCell.id;
        if (e.target.id) {
          const move = e.target.id;
          this.handleMove(move, currCell, currCellId);
        } else if (!isNaN(e.target.parentNode.id)) {
          const move = e.target.parentNode.id;
          this.handleMove(move, currCell, currCellId);
        }
      });
      // handle move by keyboard
      document.addEventListener('keydown', (e) => {
        const currCell = document.querySelector('.current-cell');
        const currCellId = currCell.id;
        const directions = new Map([
          ['ArrowUp', `${currCellId[0]}${Number(currCellId[1]) - 1}${currCellId[2]}`],
          ['ArrowDown', `${currCellId[0]}${Number(currCellId[1]) + 1}${currCellId[2]}`],
          ['ArrowLeft', `${currCellId[0]}${currCellId[1]}${Number(currCellId[2]) - 1}`],
          ['ArrowRight', `${currCellId[0]}${currCellId[1]}${Number(currCellId[2]) + 1}`],
          ['PageUp', `${Number(currCellId[0]) - 1}${currCellId[1]}${currCellId[2]}`],
          ['PageDown', `${Number(currCellId[0]) + 1}${currCellId[1]}${currCellId[2]}`]
        ])

        if (directions.has(e.key)) {
          e.preventDefault();
          const move = directions.get(e.key);

          //
          console.log(move);
          //

          this.handleMove(move, currCell, currCellId);
          this.winAction(move);
        }
      });
    }
  }
  showRules() {
    const rules = document.getElementById("rules");
    if (rules.hidden) {
      rules.hidden = false;
    } else {
      rules.hidden = true;
    }
  }

  /**
   * Reset the position of the player to the entrance of the maze
   */
  resetPosition() {
    const currCell = document.querySelector('.current-cell');
    currCell.classList.remove('current-cell');
    currCell.removeChild(document.getElementById('player'));
    const currentLevel = document.querySelector('.current-level');
    currentLevel.classList.remove('current-level');
    const start = this.#table.start;
    const initialCell = document.getElementById(`${start[0]}${start[1]}${start[2]}`)
    const initialLevel = initialCell.parentNode;
    initialCell.classList.add('current-cell');
    initialLevel.classList.add('current-level');
    this.placePlayer(initialCell);
  }

  /**
   * @returns solution of maze
   */
  solution() {
    const currtable = this.#table;
    const currPlace = document.querySelector('.current-cell').id;
    currtable.start = [Number(currPlace[0]), Number(currPlace[1]), Number(currPlace[2])];
    const adapter = new Maze3dAdapter(currtable);
    const aStar = new AStar();
    const aStarSearch = aStar.search(adapter);
    return aStarSearch;
  }

  /**
   * Get a hint for the next best move
   */
  getHint() {
    const aStarSearch = this.solution()[0];
    const hintCell = document.getElementById(`${aStarSearch[0]}${aStarSearch[1]}${aStarSearch[2]}`)
    setTimeout(() => { hintCell.style.backgroundColor = "#DE7C7C" }, 15);
    setTimeout(() => { hintCell.style.backgroundColor = "#C4DE7C" }, 450);
  }

  /**
   * The solution will move the player’s image in animation from its
   * current position to the exit
   */
  showSolution() {
    const moves = this.solution();
    const len = moves.length;
    for (const move of moves) {
      const id = `${move[0]}${move[1]}${move[2]}`;
      let currentCell = document.querySelector('.current-cell');
      let timerId = setInterval(() => {
        setTimeout(() => { this.handleMove(id, currentCell, currentCell.id); currentCell = document.querySelector('.current-cell') }, 500);
      }, 500);
      setTimeout(() => { clearInterval(timerId); }, 500 * len);
    }
    const move = moves[moves.length - 1];
    setTimeout(() => { this.winAction(`${move[0]}${move[1]}${move[2]}`); }, 500 * len)

  }

  createPortal(cell, src, flexDirection) {
    const upDownPortal = document.createElement("img");
    upDownPortal.className = "portal";
    upDownPortal.src = src;

    if (flexDirection) {
      upDownPortal.style.transform = "rotate(90deg)"
    }
    cell.appendChild(upDownPortal)
  }


  /**
   * start new game
   */
  startNewGame() {
    if (this.#isGame) {
      history.go(0);
      alert("Enter maze specification");
    }
    const workPlace = document.querySelector("main")
    workPlace.innerHTML = '';

    const inptRows = document.querySelector('#rows');
    const rows = inptRows.value;

    const inptColumns = document.querySelector('#columns');
    const columns = inptColumns.value;

    const inptDimensions = document.querySelector('#dimensions');
    const dimensions = inptDimensions.value;

    const cellBorder = 'calc(var(--index)*0.4) solid black';
    const maze = new Maze3d(rows, columns, dimensions);
    this.#table = new DFSMaze3dGenerator(maze).generate();

    const flexDirection = columns > 3 || rows > 3 || dimensions > 3;
    for (let i = 0; i < dimensions; i++) {
      const level = document.createElement('div');
      level.className = 'level';
      level.style.gridTemplateColumns = `repeat(${columns}, ${rows}fr)`;
      for (let j = 0; j < rows; j++) {
        for (let k = 0; k < columns; k++) {
          const cell = document.createElement('div');
          cell.className = 'cell';
          cell.id = `${i}${j}${k}`;
          const mazeCell = this.#table.maze[i][j][k];

          if (mazeCell.left) {
            cell.style.borderLeft = cellBorder;
          }
          if (mazeCell.right) {
            cell.style.borderRight = cellBorder;
          }
          if (mazeCell.forward) {
            cell.style.borderBottom = cellBorder;
          }
          if (mazeCell.backward) {
            cell.style.borderTop = cellBorder;
          }
          // walls between levels
          if (!mazeCell.up && !mazeCell.down) {
            this.createPortal(cell, './asserts/portal-up-down.png', flexDirection)
          } else if (!mazeCell.up) {
            this.createPortal(cell, './asserts/portal-up.png', flexDirection)
          } else if (!mazeCell.down) {
            this.createPortal(cell, './asserts/portal-down.png', flexDirection)
          }
          if (i == this.#table.start[0] && j == this.#table.start[1] && k == this.#table.start[2]) {
            this.placePlayer(cell);
            level.classList.add('current-level');
            cell.classList.add('current-cell');
          }
          if (i == this.#table.goal[0] && j == this.#table.goal[1] && k == this.#table.goal[2]) {
            cell.innerHTML = "";
            this.createPortal(cell, './asserts/goal.png', 0);
          }
          level.appendChild(cell);
        }
      }
      workPlace.appendChild(level);
    }
    if (columns > 3 || rows > 3 || dimensions > 3) {
      workPlace.style.flexDirection = "column";
    }
    if (columns > 9 || rows > 9) { }
    // if (columns > 3 || rows > 3 || dimensions > 3) {
    //   const currLevel = document.querySelector('.current-level');
    //   currLevel.style.position = "absolute";
    //   workPlace.style.gap = 'calc(var(--index)*24)';
    //   workPlace.style.paddingTop = 'calc(var(--index)*3)';
    //   let levels = document.querySelectorAll('level');
    //   for (const level of levels) {
    //     level.style.transform = "translate(-100%, -100%)";
    //   }
    // }
    this.#isGame = 1;
    this.makeMove();
  }


  // additional animations

  moveLeftPlayerAnimation(player) {
    player.setAttribute('move', 1)
    let timerId = setInterval(() => {
      player.src = './asserts/moving-left-player-1.png';
      setTimeout(() => { player.src = './asserts/moving-left-player-2.png' }, 250);
      setTimeout(() => { player.src = './asserts/moving-left-player-3.png' }, 500);
    }, 750);
    setTimeout(() => {
      setTimeout(() => { player.src = './asserts/flash.png' }, 100);
      clearInterval(timerId); player.setAttribute('move', 0);
    }, 2000);
  }
  moveRightPlayerAnimation(player) {
    player.setAttribute('move', 1)
    let timerId = setInterval(() => {
      player.src = './asserts/moving-right-player-1.png';
      setTimeout(() => { player.src = './asserts/moving-right-player-2.png' }, 250);
      setTimeout(() => { player.src = './asserts/moving-right-player-3.png' }, 500);
    }, 750);
    setTimeout(() => {
      setTimeout(() => { player.src = './asserts/flash.png' }, 100);
      clearInterval(timerId); player.setAttribute('move', 0)
    }, 2000);
  }
}
export default Widget;