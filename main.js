// __author__ = "Kirill Shiriaev https://github.com/kirshik/3d-maze/"
// __copyright__ = "Copyright (C) 2022 Kirill Shiriaev"
// __license__ = "Public Domain"
// __version__ = "1.0"
import Widget from './widget.js';

const buttons = document.getElementById("buttons");
window.addEventListener("scroll", () => {
  if (scrollY > (buttons.getBoundingClientRect().top + document.documentElement.clientHeight + 100)) {
    buttons.classList.add("buttons-fixed");
  } else {
    buttons.classList.remove("buttons-fixed");
  }
})



const game = new Widget();












