__author__ = "Kirill Shiriaev https://github.com/kirshik/3d-maze/"
__copyright__ = "Copyright (C) 2022 Kirill Shiriaev"
__license__ = "Public Domain"
__version__ = "1.0"

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