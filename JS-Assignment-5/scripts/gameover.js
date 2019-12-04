  function GameOver() {
    this.init = function (container) {
      this.gameOver = document.createElement("div");
      this.gameOver.setAttribute("id", "gameover");
      this.gameOver.style.backgroundImage = "url('images/game-over.png')";
      this.gameOver.style.width = container.style.width;
      this.gameOver.style.height = container.style.height;
      this.gameOver.style.zIndex = 1;
      this.gameOver.style.position = "absolute";
      this.gameOver.style.left = 0;
      this.gameOver.style.top = 0;
      this.gameOver.style.color = "white";
      this.gameOver.style.opacity = "0.6";
      this.gameOver.style.fontSize = '38px';
      this.gameOver.style.textAlign = "left";
      this.gameOver.style.fontFamily = "Verdana";



      this.gameOver.innerHTML = "&nbsp &nbsp Highest<br>" + "&nbsp &nbsp &nbsp &nbsp&nbsp" + highest + "<br><br><br><br><br><br><br>Press 'Space' to play again";

      this.gameOver.style.backgroundSize = "cover";
      container.appendChild(this.gameOver);
    };
  }