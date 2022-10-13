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

  #portal;
  #flexDirection = "column";

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
  constructor(pathPlayerImage = 0, pathUpDownPortal = './asserts/portal-up-down.png', workPlace = document.querySelector("main"),
    pathUpPortal = './asserts/portal-up.png', pathDownPortal = './asserts/portal-down.png',
    pathGoalPortal = './asserts/goal.png', borderColor = "black", mainBackgroundColor = "#c4de7c",
    winBtnsBackgroundColor = 'white', mainFont = 'IndianaJones', hintColor = "#de7c7c", mazeGenerator = "dfs") {
    this.mazeGenerator = mazeGenerator;
    this.pathGoalPortal = pathGoalPortal;
    this.pathUpDownPortal = pathUpDownPortal;
    this.pathUpPortal = pathUpPortal;
    this.pathDownPortal = pathDownPortal;
    this.hintColor = hintColor;
    this.pathPlayerImage = pathPlayerImage;
    this.borderColor = borderColor;
    this.workPlace = workPlace;
    this.#inptName = document.querySelector('#name');
    this.borderSize = 'calc(var(--index) * 0.4)';



    // CSS settings   
    document.documentElement.style.setProperty('--main-background-color', mainBackgroundColor);
    document.documentElement.style.setProperty('--button-backgroun-color', winBtnsBackgroundColor);
    document.documentElement.style.setProperty('--main-font', mainFont);

    // buttons
    const startNewGameButton = document.querySelector('#start').addEventListener('click', () => {
      this.startNewGame(
        () => { return this.generateTable() },
        () => { return this.setMazeParams() }
      )
    });
    const ResetPositionButton = document.querySelector('#reset').addEventListener('click', () => { this.resetPosition() });
    const showSolutionButton = document.querySelector('#solution').addEventListener('click', () => { this.showSolution() });
    const GetHintButton = document.querySelector('#hint').addEventListener('click', () => { this.getHint() });
    const saveMazeGameButton = document.querySelector('#save-maze').addEventListener('click', () => { this.saveMaze() });
    const loadMazeGameButton = document.querySelector('#load-maze').addEventListener('click', () => { this.loadMaze() });
    const showRulesButton = document.querySelector('#show-rules').addEventListener('click', () => { this.showRules() });
  }

  get isGame() {
    return this.#isGame;
  }

  /**
   * function to define validity of move
   * @param {Array} currentCellId 
   * @param {Array} nextCellId 
   * @returns bool true/false
   */
  isValidMove(currentCellId, nextCellId) {
    return this.#table.isValidMove(currentCellId, nextCellId);
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
    if (move.toString() === this.#table.goal.toString()) {
      const game = document.getElementById("game");
      const background = document.querySelector(".background");

      game.style.opacity = "0.5";

      // creating Win window
      const winDiv = document.createElement("div");
      const p = document.createElement("p");
      p.className = "gradient-text";
      p.textContent = "You WIN!";
      winDiv.className = 'win-div';
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

      if (!document.getElementById('win-start-game')) {
        background.appendChild(winDiv);
      }

      // handle win buttons
      function removeWin() {
        if (document.querySelector(".win-div")) {
          background.removeChild(winDiv);
        }
        game.style.opacity = "1";
      }
      document.querySelector('#win-close').addEventListener('click', () => { removeWin() });
      document.querySelector('#win-start-game').addEventListener('click', () => {
        removeWin();
        this.startNewGame(
          () => { return this.generateTable() },
          () => { return this.setMazeParams() }
        );
      });
      document.querySelector('#win-save-maze').addEventListener('click', () => { removeWin(); this.saveMaze() });
    }
  }

  idToArray(id) {
    return id.split(",").map(n => Number(n));
  }

  /**
   * 
   * @param {HTMLElement} level 
   */
  focusOnLevel(cell = document.querySelector(".current-cell")) {
    if (this.#flexDirection !== "row") {
      if (cell) {
        const y = cell.getBoundingClientRect().top + window.scrollY - 250;
        window.scroll({
          top: y,
          behavior: 'smooth'
        });
      }
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
    move = this.idToArray(move);
    if (this.isValidMove(currCellId, move)) {
      currCell.classList.remove('current-cell');
      const player = document.getElementById('player');
      currCell.removeChild(player);
      if (this.#portal) {
        currCell.appendChild(this.#portal)
      }

      const currentLevel = document.querySelector('.current-level');
      currentLevel.classList.remove('current-level');

      const nextCell = document.getElementById(move);
      nextCell.classList.add('current-cell');
      const portal = document.querySelector('.current-cell img:first-child');
      this.#portal = portal;
      if (portal) {
        nextCell.removeChild(portal);
      }

      const nextLevel = nextCell.parentNode;
      nextLevel.classList.add('current-level');
      this.focusOnLevel();

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
      this.workPlace.addEventListener("click", (e) => {
        const currCell = document.querySelector('.current-cell');
        const currCellId = this.idToArray(currCell.id);
        if (e.target.id) {
          const move = e.target.id;
          this.handleMove(move, currCell, currCellId);
        } else if (!isNaN(this.idToArray(e.target.parentNode.id)[0])) {
          const move = e.target.parentNode.id;
          this.handleMove(move, currCell, currCellId);
        }
      });
      // handle move by keyboard
      document.addEventListener('keydown', (e) => {
        const currCell = document.querySelector('.current-cell');
        const currCellId = this.idToArray(currCell.id);
        const directions = new Map([
          ['ArrowUp', `${currCellId[0]},${currCellId[1] - 1},${currCellId[2]}`],
          ['ArrowDown', `${currCellId[0]},${currCellId[1] + 1},${currCellId[2]}`],
          ['ArrowLeft', `${currCellId[0]},${currCellId[1]},${currCellId[2] - 1}`],
          ['ArrowRight', `${currCellId[0]},${currCellId[1]},${currCellId[2] + 1}`],
          ['PageUp', `${currCellId[0] - 1},${currCellId[1]},${currCellId[2]}`],
          ['PageDown', `${currCellId[0] + 1},${currCellId[1]},${currCellId[2]}`]
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
      if (rules) {
        const y = rules.getBoundingClientRect().top + window.scrollY - 100;
        window.scroll({
          top: y,
          behavior: 'smooth'
        })
      }
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
    const initialCell = document.getElementById(`${start[0]},${start[1]},${start[2]}`)
    const initialLevel = initialCell.parentNode;
    initialCell.classList.add('current-cell');
    initialLevel.classList.add('current-level');
    this.focusOnLevel();
    this.placePlayer(initialCell);
  }

  /**
   * @returns solution of maze
   */
  solution() {
    const currTable = this.#table;
    const currPlace = this.idToArray(document.querySelector('.current-cell').id);
    currTable.start = currPlace;
    const adapter = new Maze3dAdapter(currTable);
    const aStar = new AStar();
    const aStarSearch = aStar.search(adapter);
    return aStarSearch;
  }

  /**
   * Get a hint for the next best move
   */
  getHint() {
    const aStarSearch = this.solution()[0];
    const hintCell = document.getElementById(`${aStarSearch[0]},${aStarSearch[1]},${aStarSearch[2]}`);
    this.focusOnLevel(hintCell);
    const initialCellColor = this.mainBackgroundColor;
    setTimeout(() => { hintCell.style.backgroundColor = this.hintColor }, 50);
    setTimeout(() => { hintCell.style.backgroundColor = 'var(--main-background-color)' }, 450);
  }

  /**
   * The solution will move the player’s image in animation from its
   * current position to the exit
   */
  showSolution() {
    const moves = this.solution();
    const len = moves.length;
    let timeFlag = 1;
    for (const move of moves) {
      const id = `${move[0]},${move[1]},${move[2]}`;
      let currentCell = document.querySelector('.current-cell');
      let timerId = setInterval(() => {
        setTimeout(() => {
          try {
            this.handleMove(id, currentCell, this.idToArray(currentCell.id));
          } catch (error) { }; currentCell = document.querySelector('.current-cell')
        }, 500);
      }, 500);
      setTimeout(() => { clearInterval(timerId); }, 500 * len);
    }
    setTimeout(() => { timeFlag = 0 }, 500 * len);
    if (timeFlag === 0) {
      this.winAction(this.#table.goal);
    }

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
    return this.#table.start;
  }

  setMazeParams() {
    const inptRows = document.querySelector('#rows');
    const inptColumns = document.querySelector('#columns');
    const inptDimensions = document.querySelector('#dimensions');
    this.#rows = inptRows.value;
    this.#columns = inptColumns.value;
    this.#dimensions = inptDimensions.value;

  }
  isLarge() {
    return
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
    setMazeParams();
    const currentPosition = generateTable();

    // handle large maze
    // 0.06 - it's --index(vh*vw) convert to pixels for each cell + borders, 50 - margin left and right for each level,
    // each level contains 2 margin, so 50 * 2 * number of levels
    const isLarge = (window.innerWidth * 0.06 * this.#table.columns * this.#table.dimensions + (this.#table.dimensions * 2 * 50))
      > document.documentElement.clientWidth ||
      window.innerWidth * 0.06 * this.#table.rows + (this.#table.dimensions * 2 * 20) > document.documentElement.clientHeight;
    if (isLarge) {
      this.borderSize = 'calc(var(--index) * 0.3)';
    } else {
      this.#flexDirection = "row";
    }
    // fill mae with cells
    const cellBorder = `${this.borderSize} solid ${this.borderColor}`;
    for (let i = 0; i < this.#table.dimensions; i++) {
      const level = document.createElement('div');
      level.className = 'level';
      level.style.gridTemplateColumns = `repeat(${this.#table.columns}, ${this.#table.rows}fr)`;
      for (let j = 0; j < this.#table.rows; j++) {
        for (let k = 0; k < this.#table.columns; k++) {
          const cell = document.createElement('div');
          cell.className = 'cell';
          cell.id = `${i},${j},${k}`;
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
            portal = this.createPortal(cell, this.pathUpDownPortal, isLarge)
          } else if (!mazeCell.up) {
            portal = this.createPortal(cell, this.pathUpPortal, isLarge)
          } else if (!mazeCell.down) {
            portal = this.createPortal(cell, this.pathDownPortal, isLarge)
          }
          if (i == currentPosition[0] && j == currentPosition[1] && k == currentPosition[2]) {
            this.placePlayer(cell);
            level.classList.add('current-level');
            cell.classList.add('current-cell');
          }
          if (i == this.#table.goal[0] && j == this.#table.goal[1] && k == this.#table.goal[2]) {
            cell.innerHTML = "";
            portal = this.createPortal(cell, this.pathGoalPortal, 0);
          }
          if (portal && isLarge) {
            // portal.style.height = 'calc(var(--index) * 2)';
            document.documentElement.style.setProperty('--player-size', "calc(var(--index) * 2)");
          }
          level.appendChild(cell);
        }

      }
      this.workPlace.appendChild(level);

    }
    if (isLarge) {
      this.workPlace.style.flexDirection = "column";
    }
    if (document.querySelector(".current-level").clientWidth < document.documentElement.clientWidth) {
      this.workPlace.style.alignItems = "center";
      this.workPlace.style.justifyContent = "center";
    };
    this.#isGame = 1;
    this.focusOnLevel();
    this.makeMove();
  }

  saveMaze() {
    if (!this.#inptName.value) {
      alert("Pleae enter the name of the maze");
      return false;
    }
    if (this.idToArray(document.querySelector(".current-cell").id).toString() === this.#table.goal.toString()) {
      this.#table.currentPosition = this.#table.start.toString();
    } else {
      this.#table.currentPosition = document.querySelector(".current-cell").id;
    }

    const maze = JSON.stringify(this.#table);
    localStorage.setItem(this.#inptName.value, maze);

    // creating save window
    const game = document.getElementById("game");
    const background = document.querySelector(".background");
    game.style.opacity = "0.5";


    const saveDiv = document.createElement("div");
    const p = document.createElement("p");
    p.className = "gradient-text";
    p.textContent = "Maze saved successfully";
    saveDiv.className = 'win-div';
    saveDiv.appendChild(p);

    // creating button for save window
    const btnClose = document.createElement("button");
    btnClose.className = 'win-btn';
    btnClose.textContent = "close";
    btnClose.id = 'save-close';
    saveDiv.appendChild(btnClose);
    background.appendChild(saveDiv);

    // handle win buttons
    document.querySelector('#save-close').addEventListener('click', () => {
      background.removeChild(saveDiv);
      game.style.opacity = "1";
    });

  }
  loadMaze() {
    const name = prompt("Enter the name of your maze");
    const json = JSON.parse(localStorage.getItem(name));
    const currentPosition = this.idToArray(json.currentPosition);
    const maze = new Maze3d(Number(json.rows), Number(json.columns), Number(json.dimensions))
    maze.maze = json.maze;
    maze.start = json.start;
    maze.goal = json.goal;
    this.#table = maze;
    this.startNewGame(() => { return currentPosition }, () => { });
  }

  buttonsBar() {
    const buttons = document.querySelector(".buttons");
    const top = buttons.getBoundingClientRect().top;
    const bottom = buttons.getBoundingClientRect().bottom - 100;
    window.addEventListener("scroll", () => {
      // console.log("SCROLL Y", scrollY)
      // console.log()
      if (scrollY > bottom + buttons.clientHeight) {
        buttons.classList.add("buttons-fixed");
      } else if (scrollY <= bottom) {
        buttons.classList.remove("buttons-fixed");
      }
    })
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