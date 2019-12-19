var game = []
var instanceCount = 0;
game[instanceCount] = new Game(instanceCount);
game[instanceCount].load();


window.addEventListener('keydown', function (key) {
    if (key.keyCode == '13') {
        instanceCount++;
        this.console.log(instanceCount);
        // if(instanceCount > 1){return;} //2 instances: one for best model another to show training
        game[instanceCount] = new Game(instanceCount);

        game[instanceCount].load();
    }

});

// var g1 = new Game(0);
// g1.load();
// var g2 = new Game(1);
// g2.load();