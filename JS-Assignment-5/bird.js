function Bird() {
    var that = this;
    this.width = 30;
    this.height = 21;
    this.x = 80;
    this.y = 350;
    this.gravity = GRAVITY;
    this.upThurst = 4;
    this.init = function (container) {
      this.bird = document.createElement("div");
      this.bird.style.backgroundImage = "url('images/bird.png')";
      this.bird.style.position = "absolute";
      this.bird.style.height = this.height + "px";
      this.bird.style.width = this.width + "px";
      this.bird.style.left = this.x + "px";
      this.bird.style.top = this.y + "px";
      container.appendChild(this.bird);
      this.drop();
      container.addEventListener("click", this.update);
    };

    this.update = function (key) {
      if (key.keyCode == '32') {
        if (that.gravity < -that.upThurst) {
          that.gravity -= that.upThurst;
        }
        else { that.gravity = -that.upThurst };
        that.bird.style.top = that.y + "px";
        that.bird.style.backgroundImage
      }
    };

    this.drop = function () {
      this.gravity += 0.35;
      that.y += this.gravity;
      that.bird.style.top = that.y + "px";
    };
  }