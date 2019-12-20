// Computing fitness
function normalizeFitness(birds) {
  // Squaring the birds score for better evaluation
  for (var i = 0; i < birds.length; i++) {
    birds[i].score = birds[i].score * birds[i].score;
  }
  var sum = 0;
  for (var i = 0; i < birds.length; i++) {
    sum += birds[i].score;
  }
  // Divide by the sum
  for (var i = 0; i < birds.length; i++) {
    birds[i].fitness = birds[i].score / sum;
  }
}


// Shiffman's Algorithm for selecting the fittest
function naturalSelection(birds) {
  let index = 0;
  let r = Math.random(1);
  while (r > 0) {
    r = r - birds[index].fitness;
    index++;
  }
  index--;
  let bird = birds[index];
  let selected = new Bird(bird.brain);
  return selected;
}


// Breeding a better neural network
function crossOver(father, mother) {
  var child = new Bird();
  child.brain.weights_ih = father.brain.weights_ih;
  child.brain.weights_ho = mother.brain.weights_ho;
  return child;
}


// Slightly tweaking the child neural network
function mutation(child, mutationRate) {
  child.mutate(mutationRate);
}


// Evolution process
function evolution(gameObj, mutationRate) {
  
  normalizeFitness(gameObj.birdsRecord);
  for (let i = 0; i < gameObj.population; i++) {
    var father = naturalSelection(gameObj.birdsRecord);
    var mother = naturalSelection(gameObj.birdsRecord);
    gameObj.birds[i] = crossOver(father, mother);
    mutation(gameObj.birds[i], mutationRate);
  }
}
