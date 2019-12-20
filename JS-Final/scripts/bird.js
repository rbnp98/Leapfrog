/**
 *
 *
 * @param {*} feature
 * @param {*} MIN
 * @param {*} MAX
 * @returns scaled feature
 */
function featureScaling(feature, MIN, MAX) {
  // min-max normalization
  let scaledFeature = (feature - MIN) / (MAX - MIN);
  return scaledFeature;
}

class Bird {
  constructor(brain) {
    this.width = 28;
    this.height = 28;
    this.x = 64;
    this.y = HEIGHT / 2;

    this.gravity = 0.65;
    this.upthrust = -10;
    this.velocity = 0;

    this.image = new Image();
    this.image.src = "./images/bird.png";

    this.inputs = [];
    this.outputs = [];

    //if a neural network is given to constructor, it will be replicated else create a new neural network
    if (brain) {
      this.brain = brain.copy();
    } else {
      this.brain = new NeuralNetwork(5, 8, 2);
    }

    this.score = 0;
    this.fitness = 0;
  }

  draw(ctx) {
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
  }

  update() {
    this.score++;
    this.velocity += this.gravity;
    this.y += this.velocity;
  }

  flap() {
    this.velocity += this.upthrust;
  }

  // collision
  hits(pipe) {
    if (
      (this.x >= pipe.x && this.x <= pipe.x + pipe.width) ||
      (this.x + this.width >= pipe.x &&
        this.x + this.width <= pipe.x + pipe.width)
    ) {
      if (this.y < pipe.top || this.y + this.height >= pipe.bottom) {
        return true;
      }
    }
    return false;
  }

  watch(pipes) {
    // Sees the closest pipe
    let closestPipe = null;
    let closestDistance = 10000000000;
    for (let pipe of pipes) {
      let d = pipe.x + pipe.width - this.x;
      if (d < closestDistance && d > 0) {
        closestPipe = pipe;
        closestDistance = d;
      }
    }
    return closestPipe;
  }

  // Using neural network to decide the movement
  learn(pipes) {
    var obstacle = this.watch(pipes);

    // normlized inputs for nn (features)
    this.inputs[0] = featureScaling(this.y, 0, HEIGHT);
    this.inputs[1] = featureScaling(this.velocity, 0, 10);
    this.inputs[2] = featureScaling(obstacle.top, 0, HEIGHT);
    this.inputs[3] = featureScaling(obstacle.bottom, 0, HEIGHT);
    this.inputs[4] = featureScaling(obstacle.x, 0, WIDTH);

    this.outputs = this.brain.predict(this.inputs);

    if (this.outputs[0] > this.outputs[1]) {
      this.flap();
    }
  }

  // mutating the bird
  mutate(mutationRate = 0.05) {
    this.brain.mutate(mutationRate);
  }
}
