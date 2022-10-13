You can also visit this projects [GitHub Pages](https://kirshik.github.io/3d-maze/).:sunglasses:

### Table of Contents

*   [Setup][1]
*   [Widget][2]
    *   [Parameters][3]
    *   [Buttons][5]
*   [Copyright][4]


## Setup

clone this git repo
```
  $ git clone git://github.com/SpringSource/spring-data-graph-examples.git

```

create a new widget object with its own parameters in your `main.js` script

```
  import Widget from './PATH_TO_3D-MAZE_FOLDER/widget.js';

  const maze = new Widget();
```

if you have buttons div **class="buttons"** you can pin it to the top of the page

```
  maze.buttonsBar();
  
```


## Widget

Independent __3D-Maze widget__ with random maze generation, that can be controlled with mouse or PgUp, PgDown and arrows keys

### Parameters

*   `workPlace` **[HTMLElement][103]** HTML element containing the maze (optional, default `document.querySelector("main")`)
*   `pathPlayerImage` **[String][102]** default 0 - then you can see player animations (optional, default `0`)
*   `pathUpDownPortal` **[String][102]**  (optional, default `'./asserts/portal-up-down.png'`)
*   `pathUpPortal` **[String][102]**  (optional, default `'./asserts/portal-up.png'`)
*   `pathDownPortal` **[String][102]**  (optional, default `'./asserts/portal-down.png'`)
*   `pathGoalPortal` **[String][102]**  (optional, default `'./asserts/goal.png'`)
*   `borderColor` **[String][102]**  (optional, default `"black"`)
*   `mainBackgroundColor` **[String][102]**  (optional, default `"#c4de7c"`)
*   `winBtnsBackgroundColor` **[String][102]**  (optional, default `'white'`)
*   `mainFont` **[String][102]**  (optional, default `'IndianaJones'`)
*   `hintColor` **[String][102]**  (optional, default `"#de7c7c"`)
*   `mazeGenerator` **[String][102]** dfs, prims or random (3 types of generator available) (optional, default `"dfs"`)

### Buttons and inputs

#### Use this id on your control buttons 

*   `ResetPositionButton` = id = __reset__
*   `showSolutionButton` =  id = __solution__
*   `GetHintButton` = id = __hint__
*   `saveMazeGameButton` =  id = __save-maze__
*   `loadMazeGameButton` =  id = __load-maze__
*   `showRulesButton ` = id = __show-rules__ / id of HTML element = __rules__

#### Use this id on your inputs

*   `Name` = id = __name__
*   `Columns` =  id = __columns__
*   `Rows` = id = __rows__
*   `Dimensions`**(number of levels)** =  id = __dimensions__

## Copyright

*   `__author__` = "Kirill Shiriaev https://github.com/kirshik/3d-maze/"
*   `__copyright__` = "Copyright (C) 2022 Kirill Shiriaev"
*   `__license__ `= "Public Domain"
*   `__version__ `= "1.0"

[1]: #setup
[2]: #widget
[3]: #parameters
[4]: #copyright
[5]: #buttons-and-inputs
[102]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String
[103]: https://developer.mozilla.org/docs/Web/HTML/Element