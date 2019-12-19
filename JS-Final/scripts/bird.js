
class Bird {
  constructor(brain) {
    this.y = HEIGHT / 2;
    this.x = 64;
    this.height = 28;
    this.width = 28;

    this.gravity = 0.8;
    this.lift = -12;
    this.velocity = 0;

    this.score = 0;
    this.fitness = 0;

    this.inputs = [];
    this.outputs = [];

    if (brain) {
      this.brain = brain.copy();
    } else {
      this.brain = new NeuralNetwork(5, 8, 2);
    }

    this.birdImg = new Image();
    this.birdImg.src = "./images/bird.png";
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.drawImage(this.birdImg, this.x, this.y, this.width, this.height);
    ctx.closePath();
  }

  update() {
    this.score++;
    // console.log(this.score);
    this.velocity += this.gravity;
    this.y += this.velocity;
  }

  flap() {
    this.velocity += this.lift;
  }

 


  // collision
  hits(pipe){
    if((this.x >= pipe.x && this.x <= pipe.x+pipe.width) || (this.x+this.width >= pipe.x && this.x+this.width <= pipe.x+pipe.width)){
      if(this.y < pipe.top || this.y+this.height >= pipe.bottom){
        return true;
      }
    }
    return false;
  }

  mutate(mutationRate = 0.05) {
    this.brain.mutate(mutationRate);
  }

  learn(pipes) {
    // To find the closest pipe
    let closest = null;
    let closestDistance = Infinity;
    for (let i = 0; i < pipes.length; i++) {
      let d = (pipes[i].x + pipes[i].width) - this.x;
      if (d < closestDistance && d > 0) {
        closest = pipes[i];
        closestDistance = d;
      }
    }

    //inputs for nn (features)
    this.inputs[0] = this.y / HEIGHT;
    this.inputs[1] = closest.top / HEIGHT;
    this.inputs[2] = closest.bottom / HEIGHT;
    this.inputs[3] = closest.x / WIDTH;
    this.inputs[4] = this.velocity / 10;

    this.outputs = this.brain.predict(this.inputs);

    if (this.outputs[0] > this.outputs[1]) {
      this.flap();
    }

  }

  outOfCanvas() {
    return (this.y > HEIGHT || this.y < 0);
  }



}
