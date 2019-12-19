
class Pipe {

  constructor() {

    this.gap = 130;
    this.width = 80;
    this.x = WIDTH;

    this.top = Math.floor((Math.random() * (1 / 2 * HEIGHT)) + (HEIGHT / 8));
    this.bottom =  (this.top + this.gap);
   
    this.height = 500;
    this.speed = 6;

    this.pipeUp = new Image();
    this.pipeUp.src = './images/pipeUp.png';
    this.pipeDown = new Image();
    this.pipeDown.src = './images/pipeDown.png';

  }

  draw(ctx) {
    ctx.beginPath();
    ctx.drawImage(this.pipeUp, this.x, this.top-this.height, this.width, this.height);
    ctx.drawImage(this.pipeDown, this.x, this.bottom, this.width, this.height);
    ctx.closePath();
  }

  update() {
    this.x -= this.speed;
  }

  

  
outOfCanvas() {
    if (this.x < -this.width) {
      return true;
    } else {
      return false;
    }
  }
}
