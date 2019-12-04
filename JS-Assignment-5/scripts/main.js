const GRAVITY = 0;
var highest = window.localStorage.getItem('highest');


const GAME_STATE = {
  start: 1,
  playing: 2,
  over: 3
};

(function () {
  var game = new Game();
  game.init();
})();
