
class Pipe {

  constructor() {
    this.width = 80;
    this.gap = 130;
    
    this.x = WIDTH;

    this.top = Math.floor((Math.random() * (1 / 2 * HEIGHT)) + (HEIGHT / 8));
    this.bottom =  (this.top + this.gap);
   
    this.height = HEIGHT;
    this.speed = 5;

    this.pipeUp = new Image();
    this.pipeUp.src = './images/pipeUp.png';
    this.pipeDown = new Image();
    this.pipeDown.src = './images/pipeDown.png';

  }

  draw(ctx) {
    ctx.drawImage(this.pipeUp, this.x, this.top-this.height, this.width, this.height);
    ctx.drawImage(this.pipeDown, this.x, this.bottom, this.width, this.height);
  }

  update() {
    this.x -= this.speed;
  }
}
