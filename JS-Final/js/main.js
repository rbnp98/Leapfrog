var game = [];
var instanceCount = 0;

//initially a game instance is created
game[instanceCount] = new Game(instanceCount);
game[instanceCount].load();

// create a new game instance if ENTER is pressed
window.addEventListener("keydown", function(key) {
  if (key.keyCode == "13") {
    instanceCount++;
    this.console.log(instanceCount);
    // if(instanceCount > 1){return;} //2 instances: one for best model another to show training
    game[instanceCount] = new Game(instanceCount);
    game[instanceCount].load();
  }
});
