function computeFitness(game){
    let sum = 0;
    for(bird of game.birdsRecord){
        sum += bird.score;  
    }

    for(bird of game.birdsRecord){
        bird.fitness = bird.score/sum;
        // console.log(bird.fitness);

    }
}

function naturalSelection(gameObj){
    let index = 0;
    let r = Math.random(1);
    while (r > 0) {
      r = r - gameObj.birdsRecord[index].fitness;
      index++;
    }
    index--;
    let bird = gameObj.birdsRecord[index];
    let selected = new Bird(bird.brain);
    return selected;
        

}

function crossOver(father, mother){
    var child = new Bird();
    child.brain.weights_ih = father.brain.weights_ih;
    child.brain.weights_ho = mother.brain.weights_ho;
    return child;
}

function mutation(child, mutationRate){
    child.mutate(mutationRate);
}


function evolution(game, mutationRate){

    computeFitness(game);
    
    for(let i =0; i< game.TOTAL; i++){
        var father = naturalSelection(game);
        var mother = naturalSelection(game);
        game.birds[i] = crossOver(father, mother);

        // console.log(father.brain);
        mutation(game.birds[i], mutationRate);
    }

    game.birdsRecord = [];

}



