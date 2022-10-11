// __author__ = "Kirill Shiriaev https://github.com/kirshik/3d-maze/"
// __copyright__ = "Copyright (C) 2022 Kirill Shiriaev"
// __license__ = "Public Domain"
// __version__ = "1.0"
import DFSMaze3dGenerator from './dfs-maze-3d-generator.js';
import SimpleMaze3dGenerator from './simple-maze-3d-generator.js';
import PrimsMaze3dGenerator from './prims-maze-3d-generator.js';
import Maze3d from './maze3d.js';
import AStar from './search-algorithms/a-star-algorithm.js';
import Maze3dAdapter from "./maze-3d-adapter.js";




class Widget {
  // class variables
  #isGame = 0;
  #table;
  #inptName;
  #rows;
  #columns;
  #dimensions;

  /**
   * @param {String} pathPlayerImage  default 0 - then you can see player animations
   * @param {String} pathUpDownPortal 
   * @param {String} pathUpPortal 
   * @param {String} pathDownPortal 
   * @param {String} pathGoalPortal 
   * @param {String} borderColor 
   * @param {String} mainBackgroundColor 
   * @param {String} winBtnsBackgroundColor 
   * @param {String} mainFont 
   * @param {String} hintColor 
   * @param {String} mazeGenerator  dfs, prims or random (3 types of generator available)
   */
  constructor(pathPlayerImage = 0, pathUpDownPortal = './asserts/portal-up-down.png',
    pathUpPortal = './asserts/portal-up.png', pathDownPortal = './asserts/portal-down.png',
    pathGoalPortal = './asserts/goal.png', borderColor = "black", mainBackgroundColor = '#c4de7c',
    winBtnsBackgroundColor = 'white', mainFont = 'IndianaJones', hintColor = "#DE7C7C", mazeGenerator = "dfs") {
    this.mazeGenerator = mazeGenerator;
    this.pathGoalPortal = pathGoalPortal;
    this.pathUpDownPortal = pathUpDownPortal;
    this.pathUpPortal = pathUpPortal;
    this.pathDownPortal = pathDownPortal;
    this.hintColor = hintColor;
    this.pathPlayerImage = pathPlayerImage;
    this.borderColor = borderColor;
    this.#inptName = document.querySelector('#name');
    this.borderSize = 'calc(var(--index) * 0.4)';



    // CSS settings   
    document.documentElement.style.setProperty('--main-background-color', mainBackgroundColor);
    document.documentElement.style.setProperty('--button-backgroun-color', winBtnsBackgroundColor);
    document.documentElement.style.setProperty('--main-font', mainFont);

    // buttons
    const startNewGameButton = document.querySelector('#start').addEventListener('click', () => {
      this.startNewGame(
        () => { this.generateTable() },
        () => { this.setMazeParams() }
      )
    });
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
    if (this.pathPlayerImage === 0) {
      setTimeout(() => { player.src = './asserts/flash.png' }, 25);
      setInterval(() => {
        if (player.getAttribute('move') == 0) {
          player.src = './asserts/stand-player.png';
          setTimeout(() => { player.src = './asserts/moving-player.png' }, 300);
        }
      }, 600);
    } else {
      player.src = this.pathPlayerImage;
    }
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
 * Win window
 * @param {String} move
 * example : 001 
 */
  winAction(move) {
    if (move === `${this.#table.goal[0]}${this.#table.goal[1]}${this.#table.goal[2]}`) {
      const game = document.getElementById("game");
      const background = document.querySelector(".background");

      game.style.opacity = "0.5";

      // creating Win window
      const winDiv = document.createElement("div");
      const p = document.createElement("p");
      p.className = "gradient-text";
      p.textContent = "You WIN!";
      winDiv.id = 'win-div';
      winDiv.appendChild(p);

      const btnDiv = document.createElement("div");
      btnDiv.id = "win-btn-div";

      // creating buttons for win window
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

      // handle win buttons
      function removeWin() {
        background.removeChild(winDiv);
        game.style.opacity = "1";
      }
      document.querySelector('#win-close').addEventListener('click', () => { removeWin() });
      document.querySelector('#win-start-game').addEventListener('click', () => {
        removeWin();
        this.startNewGame(
          () => { this.generateTable() },
          () => { this.setMazeParams() }
        );
      });
      document.querySelector('#win-save-maze').addEventListener('click', () => { });
    }
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
      this.winAction(move);
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
          this.handleMove(move, currCell, currCellId);
        }
      });
    }
  }
  /**
   * show rules div
   */
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
    setTimeout(() => { hintCell.style.backgroundColor = this.hintColor }, 15);
    setTimeout(() => { hintCell.style.backgroundColor = this.mainBackgroundColor }, 450);
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

  /**
   * function to put portals in cells
   * @param {HTMLElement} cell 
   * @param {String} src 
   * @param {String} flexDirection 
   * @returns 
   */
  createPortal(cell, src, flexDirection) {
    const upDownPortal = document.createElement("img");
    upDownPortal.className = "portal";
    upDownPortal.src = src;

    if (flexDirection) {
      upDownPortal.style.transform = "rotate(90deg)";
    }
    cell.appendChild(upDownPortal);
    return upDownPortal;
  }

  /**
   * create new maze using chosen generator
   */
  generateTable() {
    const maze = new Maze3d(this.#rows, this.#columns, this.#dimensions);
    if (this.mazeGenerator === "dfs") {
      this.#table = new DFSMaze3dGenerator(maze).generate();
    } else if (this.mazeGenerator === 'random') {
      this.#table = new SimpleMaze3dGenerator(maze).generate();
    } else if (this.mazeGenerator === 'prims') {
      this.#table = new PrimsMaze3dGenerator(maze).generate();
    } else {
      this.#table = new DFSMaze3dGenerator(maze).generate();
    }
  }

  setMazeParams() {
    const inptRows = document.querySelector('#rows');
    const inptColumns = document.querySelector('#columns');
    const inptDimensions = document.querySelector('#dimensions');
    this.#rows = inptRows.value;
    this.#columns = inptColumns.value;
    this.#dimensions = inptDimensions.value;

  }

  /**
   * start new game
   */
  startNewGame(generateTable, setMazeParams) {
    // refresh the page if the user starts a new game from the current game
    if (this.#isGame) {
      history.go(0);
      alert("Enter maze specification");
    }
    // set main params
    const workPlace = document.querySelector("main")
    setMazeParams();
    generateTable();

    const rows = this.#rows;
    const columns = this.#columns;
    const dimensions = this.#dimensions;


    const flexDirection = columns > 3 || rows > 3 || dimensions > 3;

    // handle large maze
    if (columns > 7 || rows > 7) {
      this.borderSize = 'calc(var(--index) * 0.2)';
    }
    // fill mae with cells
    const cellBorder = `${this.borderSize} solid ${this.borderColor}`;
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
          let portal;
          if (!mazeCell.up && !mazeCell.down) {
            portal = this.createPortal(cell, this.pathUpDownPortal, flexDirection)
          } else if (!mazeCell.up) {
            portal = this.createPortal(cell, this.pathUpPortal, flexDirection)
          } else if (!mazeCell.down) {
            portal = this.createPortal(cell, this.pathDownPortal, flexDirection)
          }
          if (i == this.#table.start[0] && j == this.#table.start[1] && k == this.#table.start[2]) {
            this.placePlayer(cell);
            level.classList.add('current-level');
            cell.classList.add('current-cell');
          }
          if (i == this.#table.goal[0] && j == this.#table.goal[1] && k == this.#table.goal[2]) {
            cell.innerHTML = "";
            portal = this.createPortal(cell, this.pathGoalPortal, 0);
          }
          if (portal && (columns > 7 || rows > 7)) {
            portal.style.height = 'calc(var(--index) * 2)';
            document.documentElement.style.setProperty('--player-size', "calc(var(--index) * 2)");
          }
          level.appendChild(cell);
        }

      }
      workPlace.appendChild(level);
    }
    if (columns > 3 || rows > 3 || dimensions > 3) {
      workPlace.style.flexDirection = "column";
    }
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