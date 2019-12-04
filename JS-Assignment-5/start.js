function Start() {
    this.init = function (container) {
      this.start = document.createElement("div");
      this.start.setAttribute("id", "startgame");
      this.start.style.backgroundImage = "url('images/start.png')";
      this.start.style.position = "absolute";
      this.start.style.width = "188px";
      this.start.style.height = "170px";
      this.start.style.left = "400px";
      this.start.style.top = "150px";
      this.start.innerHTML = "Use 'space' or 'left click to jump";
      this.start.style.display = "inline";
      container.appendChild(this.start);
    };

    this.update = function (value) {
      this.start.style.display = value;
    };
  }