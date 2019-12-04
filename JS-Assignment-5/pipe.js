 function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
  }

  function Pipe() {
    this.gap = 121;
    this.width = 50;
    this.x = 948;
    this.y = 0;
    this.ht = Math.floor(Math.random() * 242);
    this.hb = 500 - this.ht - this.gap;
    this.speed = 4;
    this.color;

    this.pipeUp = document.createElement("div");
    this.pipeDown = document.createElement("div");

    this.init = function (container) {
      this.pipeUp.style.position = "absolute";
      this.pipeUp.style.width = this.width + "px";
      this.pipeUp.style.left = this.x + "px";
      this.pipeUp.innerHTML = "<img src = 'images/pipeUp.png' class = 'images'>";
      this.pipeUp.style.top = this.y + "px";
      this.pipeUp.style.height = this.ht + "px";
      this.pipeUp.style.backgroundSize = 'contain';

      this.pipeDown.style.position = "absolute";
      this.pipeDown.style.width = this.width + "px";
      this.pipeDown.style.left = this.x + "px";
      this.pipeDown.innerHTML = "<img src = 'images/pipeDown.png' class = 'images'>";
      this.pipeDown.style.bottom = this.y + "px";
      this.pipeDown.style.height = this.hb + "px";

      container.appendChild(this.pipeUp);
      container.appendChild(this.pipeDown);
    };

    this.update = function () {
      this.x -= this.speed;
      this.pipeUp.style.left = this.x + "px";
      this.pipeDown.style.left = this.x + "px";
    };
     
  }