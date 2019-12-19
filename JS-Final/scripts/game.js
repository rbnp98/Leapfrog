let images = ['./images/bg.png', './images/pipeDown.png', './images/pipeUp.png', './images/bird.png'];
let loaded = 0;

function preloader(initFn, images) {

  for (let image of images) {
    let img = new Image();
    img.src = image;
    img.onload = function () {
      loaded++;
      if (loaded === images.length) {
        initFn();
      }
    }
  }
  Game.imgLoaded = true;
}


class Game {
  constructor(n) {

    this.instance = n;

    this.score = 0;
    this.highscore = 0;

    
    this.birdsRecord = [];
    this.birds = [];
    this.pipes = [];
    
    this.population = 1000; // number of birds(NN)
    this.generation = 1;
    this.alive = this.population;
    

    this.speed = 1;
    this.mutationRate = 0.05;
    this.counter = 0; // to adjust the spacing between incoming pipes

    this.env;
    this.container;
    this.canvas;
    this.ctx;
    this.config;

    this.setup = this.setup.bind(this);
    this.draw = this.draw.bind(this);
    this.game = this.gameplay.bind(this);
    this.init = this.init.bind(this);

    this.setup();

  }

  load() {
    if (Game.imgLoaded) { this.init(); return; }
    preloader(this.init, images);
  }

  init() {
    setInterval(this.draw, FPS);
  }


  setup() {
    this.env = new Environment(this);

    for (let i = 0; i < this.population; i++) {
      this.birds.push(new Bird());
    }
  }

  draw() {

    this.ctx.clearRect(0, 0, WIDTH, HEIGHT);//clearing the canvas
    this.backgroundImg = new Image();
    this.backgroundImg.src = './images/bg.png';
    this.ctx.drawImage(this.backgroundImg, 0, 0, WIDTH, HEIGHT);

    for (let bird of this.birds) {
      bird.draw(this.ctx);
    }


    for (let pipe of this.pipes) {
      pipe.draw(this.ctx);
    }





    
    this.gameplay();
  }


  gameplay() {


    this.mutationRate = document.getElementById('rate').value;
    this.speed = document.getElementsByClassName('speed')[this.instance].value;
    for (let i = 0; i <= this.speed; i++) {
      if (this.counter % 65 == 0) {
        this.pipes.push(new Pipe(this));
      }
      this.counter++;

      for (let i = 0; i < this.birds.length; i++) {
        this.birds[i].learn(this.pipes)
        this.birds[i].update();




      }




      for (let i = this.pipes.length - 1; i >= 0; i--) {
        this.pipes[i].update();

        for (let j = 0; j < this.birds.length; j++) {
          if (this.birds[j].hits(this.pipes[i]) || this.birds[j].y > HEIGHT || this.birds[j].y < 0) {
            this.birds[j].score--;
            this.alive--;
            this.birdsRecord.push(this.birds.splice(j, 1)[0]);

          }

        }

        if (this.pipes[i].x < -this.pipes[i].width) {
          this.pipes.splice(i, 1);
          this.score++;
          if (this.score > this.highscore) {
            this.highscore = this.score;
          }
        }
      }

      if (this.birds.length === 0) {
        this.counter = 0;
        this.pipes = [];
        this.score = 0;
        evolution(this, this.mutationRate);
        this.generation += 1;
        this.alive = this.population;
        this.birdsRecord = [];

      }

      this.env.updateInfo(this);

    }
  }
}