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
    // console.log(this.score);
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

  learn(pipes) {
    var obstacle = this.watch(pipes);

    //inputs for nn (features) and normalizing them
    this.inputs[0] = this.y / HEIGHT;
    this.inputs[1] = obstacle.top / HEIGHT;
    this.inputs[2] = obstacle.bottom / HEIGHT;
    this.inputs[3] = obstacle.x / WIDTH;
    this.inputs[4] = this.velocity / 10;

    this.outputs = this.brain.predict(this.inputs);

    if (this.outputs[0] > this.outputs[1]) {
      this.flap();
    }
  }
  mutate(mutationRate = 0.05) {
    this.brain.mutate(mutationRate);
  }
}
