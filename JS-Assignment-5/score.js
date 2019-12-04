
  function Score(container) {
    this.point = 0;

    this.init = function (container) {
      this.score = document.createElement("div");
      this.score.style.position = "relative";
      this.score.style.left = "10px";
      this.score.style.top = "5px";
      this.score.style.fontSize = "80px";
      this.score.style.fontFamily = "Verdana";
      this.score.style.textAlign = "center";
      this.score.style.zIndex = "19";
      this.score.style.color = "white";
      container.appendChild(this.score);
    };

    this.update = function (score) {
      this.score.innerText = score;
    };
  }
