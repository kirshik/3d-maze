*   `__author__` = "Kirill Shiriaev https://github.com/kirshik/3d-maze/"
*   `__copyright__` = "Copyright (C) 2022 Kirill Shiriaev"
*   `__license__ `= "Public Domain"
*   `__version__ `= "1.0"

### Parameters

*   `pathPlayerImage` **[String]** default 0 - then you can see player animations (optional, default `0`)
*   `pathUpDownPortal` **[String]**  (optional, default `'./asserts/portal-up-down.png'`)
*   `workPlace`   **[HTMLElement]**(optional, default `document.querySelector("main")`)
*   `pathUpPortal` **[String]**  (optional, default `'./asserts/portal-up.png'`)
*   `pathDownPortal` **[String]**  (optional, default `'./asserts/portal-down.png'`)
*   `pathGoalPortal` **[String]**  (optional, default `'./asserts/goal.png'`)
*   `borderColor` **[String]**  (optional, default `"black"`)
*   `mainBackgroundColor` **[String]**  (optional, default `#C4DE7C`)
*   `winBtnsBackgroundColor` **[String]**  (optional, default `#FFFFFF`)
*   `mainFont` **[String]**  (optional, default `'IndianaJones'`)
*   `hintColor` **[String]**  (optional, default `"#DE7C7C"`)
*   `mazeGenerator` **[String]** dfs, prims or random (3 types of generator available) (optional, default `"dfs"`)


This site was built using [GitHub Pages](https://kirshik.github.io/3d-maze/).:sunglasses:

### Table of Contents

*   [constructor][1]
    *   [Parameters][2]
*   [isValidMove][3]
    *   [Parameters][4]
*   [standPlayerAnimation][5]
    *   [Parameters][6]
*   [placePlayer][7]
    *   [Parameters][8]
*   [winAction][9]
    *   [Parameters][10]
*   [focusOnLevel][11]
    *   [Parameters][12]
*   [handleMove][13]
    *   [Parameters][14]
*   [makeMove][15]
*   [showRules][16]
*   [resetPosition][17]
*   [solution][18]
*   [getHint][19]
*   [showSolution][20]
*   [createPortal][21]
    *   [Parameters][22]
*   [generateTable][23]
*   [startNewGame][24]
    *   [Parameters][25]
*   [DFSMaze3dGenerator][26]
    *   [Parameters][27]
    *   [unvisitedNeighbours][28]
        *   [Parameters][29]
    *   [generate][30]
*   [Maze3dGenerator][31]
    *   [Parameters][32]
    *   [generate][33]
    *   [randomInt][34]
        *   [Parameters][35]
    *   [cellNeighbours][36]
        *   [Parameters][37]
    *   [getRandomFromMap][38]
        *   [Parameters][39]
    *   [breakWall][40]
        *   [Parameters][41]
    *   [createRandomPoint][42]
        *   [Parameters][43]
    *   [measureAlgorithmTime][44]
*   [SimpleMaze3dGenerator][45]
    *   [Parameters][46]
    *   [distanceBetweenCells][47]
        *   [Parameters][48]
*   [PrimsMaze3dGenerator][49]
    *   [Parameters][50]
    *   [unvisitedNeighbours][51]
        *   [Parameters][52]
    *   [breakRandomMazeWalls][53]
        *   [Parameters][54]
    *   [generate][55]
*   [Maze3d][56]
    *   [Parameters][57]
    *   [isValidMove][58]
        *   [Parameters][59]
    *   [toString][60]
*   [Cell][61]
    *   [Parameters][62]
*   [heuristic][63]
    *   [Parameters][64]
*   [setChildNode][65]
    *   [Parameters][66]
*   [isIncludesFrontier][67]
    *   [Parameters][68]
*   [forCondition][69]
    *   [Parameters][70]
*   [search][71]
    *   [Parameters][72]
*   [SearchNode][73]
    *   [Parameters][74]
*   [PriorityQueue][75]
    *   [Parameters][76]
*   [solution][77]
    *   [Parameters][78]
*   [isIncludes][79]
    *   [Parameters][80]
*   [setChildNode][81]
    *   [Parameters][82]
*   [successor][83]
    *   [Parameters][84]
*   [forCondition][85]
    *   [Parameters][86]
*   [frontierLength][87]
    *   [Parameters][88]
*   [search][89]
    *   [Parameters][90]
*   [getNumberOfNodesEvaluated][91]
*   [Maze3dAdapter][92]
    *   [Parameters][93]
    *   [getStateTransitions][94]
        *   [Parameters][95]
*   [isBetween][96]
    *   [Parameters][97]
*   [getStateTransitions][98]
    *   [Parameters][99]
*   [goalTest][100]
    *   [Parameters][101]

## constructor

### Parameters

*   `pathPlayerImage` **[String][102]** default 0 - then you can see player animations (optional, default `0`)
*   `pathUpDownPortal` **[String][102]**  (optional, default `'./asserts/portal-up-down.png'`)
*   `workPlace`   (optional, default `document.querySelector("main")`)
*   `pathUpPortal` **[String][102]**  (optional, default `'./asserts/portal-up.png'`)
*   `pathDownPortal` **[String][102]**  (optional, default `'./asserts/portal-down.png'`)
*   `pathGoalPortal` **[String][102]**  (optional, default `'./asserts/goal.png'`)
*   `borderColor` **[String][102]**  (optional, default `"black"`)
*   `mainBackgroundColor` **[String][102]**  (optional, default `"#c4de7c"`)
*   `winBtnsBackgroundColor` **[String][102]**  (optional, default `'white'`)
*   `mainFont` **[String][102]**  (optional, default `'IndianaJones'`)
*   `hintColor` **[String][102]**  (optional, default `"#de7c7c"`)
*   `mazeGenerator` **[String][102]** dfs, prims or random (3 types of generator available) (optional, default `"dfs"`)

## isValidMove

function to define validity of move

### Parameters

*   `currentCellId` **[Array][103]**&#x20;
*   `nextCellId` **[Array][103]**&#x20;

Returns **any** bool true/false

## standPlayerAnimation

animation of player

### Parameters

*   `player` &#x20;

## placePlayer

place player in cell

### Parameters

*   `cell` &#x20;

## winAction

Win window

### Parameters

*   `move` **[String][102]** example : 001

## focusOnLevel

### Parameters

*   `cell`   (optional, default `document.querySelector(".current-cell")`)
*   `level` **[HTMLElement][104]**&#x20;

## handleMove

change current cell and level depending of move
place player to next cell if move is valid

### Parameters

*   `move` **[String][102]**&#x20;
*   `currCell` &#x20;
*   `currCellId` **[String][102]**&#x20;

## makeMove

handle click and keyboard event

## showRules

show rules div

## resetPosition

Reset the position of the player to the entrance of the maze

## solution

Returns **any** solution of maze

## getHint

Get a hint for the next best move

## showSolution

The solution will move the player’s image in animation from its
current position to the exit

## createPortal

function to put portals in cells

### Parameters

*   `cell` **[HTMLElement][104]**&#x20;
*   `src` **[String][102]**&#x20;
*   `flexDirection` **[String][102]**&#x20;

## generateTable

create new maze using chosen generator

## startNewGame

start new game

### Parameters

*   `generateTable` &#x20;
*   `setMazeParams` &#x20;

## DFSMaze3dGenerator

**Extends Maze3dGenerator**

class DFS represent DFS maze generator

### Parameters

*   `maze` &#x20;

### unvisitedNeighbours

function to create a list of unvisited neighbors

#### Parameters

*   `cell` **[Cell][61]**&#x20;
*   `maze` **[Maze3d][56]**&#x20;
*   `visited` **[Array][103]**&#x20;

### generate

function for generate 3d maze by using DFS algorithm

Returns **[Maze3dGenerator][31]**&#x20;

## Maze3dGenerator

Abstract class represents any maze generator

### Parameters

*   `maze` **[Maze3d][56]**&#x20;

### generate

Abstract method represents random maze generator

### randomInt

#### Parameters

*   `max` **[number][105]**&#x20;

Returns **any** random number from 0 to max

### cellNeighbours

function to determine all cell neighbors and their directions

#### Parameters

*   `cell` **[Cell][61]**&#x20;
*   `maze` **[Maze3d][56]**&#x20;

Returns **any** Map of all cell neighbours

### getRandomFromMap

a function to pick a random key-value of the map

#### Parameters

*   `map` **[Map][106]**&#x20;

Returns **any** Array \[key, value]

### breakWall

a function that destroys the wall between two cells

#### Parameters

*   `key` **[string][102]**&#x20;
*   `cell` **[Cell][61]**&#x20;
*   `mazeCell` **[Cell][61]**&#x20;

### createRandomPoint

choose random cell in the board

#### Parameters

*   `maze` **[Maze3d][56]**&#x20;

Returns **any** Array of start/goal cell place

### measureAlgorithmTime

Returns **any** number rounded to tenths

## SimpleMaze3dGenerator

**Extends Maze3dGenerator**

SimpleMaze3dGenerator represents random maze generator

### Parameters

*   `maze` **[Maze3d][56]**&#x20;

### distanceBetweenCells

find distance between points using sqrt((x1 - x2)\*\*2 + (y1- y2)\*\*2 ...)

#### Parameters

*   `source` **[Array][103]**&#x20;
*   `target` **[Array][103]**&#x20;

## PrimsMaze3dGenerator

**Extends Maze3dGenerator**

class represents Prim's algorith for generate 3d maze

### Parameters

*   `maze` **[Maze3d][56]**&#x20;

### unvisitedNeighbours

#### Parameters

*   `cell` **[Cell][61]**&#x20;
*   `maze` **[Maze3d][56]**&#x20;
*   `visited` **[Array][103]**&#x20;

Returns **any** map of unvisited neighbours
where key = direction, value = Cell object

### breakRandomMazeWalls

function that break random wall
between the cell and the current maze

#### Parameters

*   `cell` **[Cell][61]**&#x20;
*   `maze` **[Maze3d][56]**&#x20;
*   `visited` **[Array][103]**&#x20;

Returns **any** boolean

### generate

function for generate 3d maze by using Primes algorithm

Returns **[Maze3dGenerator][31]**&#x20;

## Maze3d

class Maze3d represent 3d maze

### Parameters

*   `rows` **[number][105]**&#x20;
*   `columns` **[number][105]**&#x20;
*   `dimensions` **[number][105]**&#x20;

### isValidMove

#### Parameters

*   `currentCell` **[Array][103]**&#x20;
*   `nextCell` **[Array][103]**&#x20;

### toString

Returns **any** console representation of the maze

## Cell

class Cell represent cell of 3d maze

### Parameters

*   `place` &#x20;
*   `up` **[Boolean][107]**  (optional, default `1`)
*   `down` **[Boolean][107]**  (optional, default `1`)
*   `forward`   (optional, default `1`)
*   `backward`   (optional, default `1`)
*   `left` **[Boolean][107]**  (optional, default `1`)
*   `right` **[Boolean][107]**  (optional, default `1`)

## heuristic

heuristic function h(s) that estimates how close state s is to the goal

### Parameters

*   `node` **[SearchNode][73]**&#x20;
*   `previousNode` **[SearchNode][73]**&#x20;
*   `goalNode` **[SearchNode][73]**  (optional, default `this.goal`)

Returns **any** boolean

## setChildNode

function to create a new child node

### Parameters

*   `node` **[SearchNode][73]**&#x20;
*   `action` **[SearchNode][73]**&#x20;
*   `cost` **[Number][105]**&#x20;

## isIncludesFrontier

a function to determine if an object is part of the frontier

### Parameters

*   `frontier` **[PriorityQueue][75]**&#x20;
*   `child` **[SearchNode][73]**&#x20;

## forCondition

conditions of for loop

### Parameters

*   `problem` **Searchable**&#x20;
*   `frontier` **any**&#x20;
*   `child` **[SearchNode][73]**&#x20;
*   `visited` **[Set][108]**&#x20;

Returns **any** sulution array / undefined

## search

3d maze solution search function

### Parameters

*   `problem` **Searchable**&#x20;

Returns **any** false / array of state objects

## SearchNode

represent node of search algorithm

### Parameters

*   `state` &#x20;
*   `previousNode` &#x20;
*   `cost`   (optional, default `1`)

## PriorityQueue

Priority queue data structure

### Parameters

*   `goal` &#x20;
*   `comparator`   (optional, default `(a,b)=>a>b`)

## solution

function to output solver steps

### Parameters

*   `initialState` **State.js**&#x20;
*   `node` **SearchNode.js**&#x20;

Returns **any** array of state objects

## isIncludes

a function to determine if an object is part of the data

### Parameters

*   `data` &#x20;
*   `obj` **[SearchNode][73]**&#x20;

Returns **any** bool

## setChildNode

function to create a new child node

### Parameters

*   `node` **[SearchNode][73]**&#x20;
*   `action` **State**&#x20;

Returns **any** Map

## successor

transition function

### Parameters

*   `problem` **Searchable**&#x20;
*   `node` **[SearchNode][73]**&#x20;

## forCondition

conditions of for loop
depends on the algorithm

### Parameters

*   `problem` **Searchable**&#x20;
*   `frontier` **any**&#x20;
*   `child` **[SearchNode][73]**&#x20;
*   `visited` **[Set][108]**&#x20;

Returns **any** sulution array / undefined

## frontierLength

length or size of frontier

### Parameters

*   `frontier` &#x20;

## search

3d maze solution search function

### Parameters

*   `problem` **Searchable**&#x20;

Returns **any** false or array of state objects

## getNumberOfNodesEvaluated

Returns **any** number

## Maze3dAdapter

**Extends Searchable**

a class designed to adapt Maze 3d for the solver

### Parameters

*   `maze` &#x20;

### getStateTransitions

function to determine all possible options from the current move

#### Parameters

*   `nodeState` **State**&#x20;

Returns **any** array of states

## isBetween

### Parameters

*   `end` **[number][105]**&#x20;
*   `arg` **[number][105]**&#x20;

Returns **any** boolean

## getStateTransitions

return data structure of actions

### Parameters

*   `nodeState` **State**&#x20;

## goalTest

check if the current state matches the target state

### Parameters

*   `nodeState` **[Node][109]**&#x20;

Returns **any** Boolean

[1]: #constructor

[2]: #parameters

[3]: #isvalidmove

[4]: #parameters-1

[5]: #standplayeranimation

[6]: #parameters-2

[7]: #placeplayer

[8]: #parameters-3

[9]: #winaction

[10]: #parameters-4

[11]: #focusonlevel

[12]: #parameters-5

[13]: #handlemove

[14]: #parameters-6

[15]: #makemove

[16]: #showrules

[17]: #resetposition

[18]: #solution

[19]: #gethint

[20]: #showsolution

[21]: #createportal

[22]: #parameters-7

[23]: #generatetable

[24]: #startnewgame

[25]: #parameters-8

[26]: #dfsmaze3dgenerator

[27]: #parameters-9

[28]: #unvisitedneighbours

[29]: #parameters-10

[30]: #generate

[31]: #maze3dgenerator

[32]: #parameters-11

[33]: #generate-1

[34]: #randomint

[35]: #parameters-12

[36]: #cellneighbours

[37]: #parameters-13

[38]: #getrandomfrommap

[39]: #parameters-14

[40]: #breakwall

[41]: #parameters-15

[42]: #createrandompoint

[43]: #parameters-16

[44]: #measurealgorithmtime

[45]: #simplemaze3dgenerator

[46]: #parameters-17

[47]: #distancebetweencells

[48]: #parameters-18

[49]: #primsmaze3dgenerator

[50]: #parameters-19

[51]: #unvisitedneighbours-1

[52]: #parameters-20

[53]: #breakrandommazewalls

[54]: #parameters-21

[55]: #generate-2

[56]: #maze3d

[57]: #parameters-22

[58]: #isvalidmove-1

[59]: #parameters-23

[60]: #tostring

[61]: #cell

[62]: #parameters-24

[63]: #heuristic

[64]: #parameters-25

[65]: #setchildnode

[66]: #parameters-26

[67]: #isincludesfrontier

[68]: #parameters-27

[69]: #forcondition

[70]: #parameters-28

[71]: #search

[72]: #parameters-29

[73]: #searchnode

[74]: #parameters-30

[75]: #priorityqueue

[76]: #parameters-31

[77]: #solution-1

[78]: #parameters-32

[79]: #isincludes

[80]: #parameters-33

[81]: #setchildnode-1

[82]: #parameters-34

[83]: #successor

[84]: #parameters-35

[85]: #forcondition-1

[86]: #parameters-36

[87]: #frontierlength

[88]: #parameters-37

[89]: #search-1

[90]: #parameters-38

[91]: #getnumberofnodesevaluated

[92]: #maze3dadapter

[93]: #parameters-39

[94]: #getstatetransitions

[95]: #parameters-40

[96]: #isbetween

[97]: #parameters-41

[98]: #getstatetransitions-1

[99]: #parameters-42

[100]: #goaltest

[101]: #parameters-43

[102]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String

[103]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array

[104]: https://developer.mozilla.org/docs/Web/HTML/Element

[105]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number

[106]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Map

[107]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Boolean

[108]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Set

[109]: https://developer.mozilla.org/docs/Web/API/Node/nextSibling