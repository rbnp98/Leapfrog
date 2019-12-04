 function Game() {
    this.height = 500;
    this.width = 1000;
    this.status = GAME_STATE.start;

    this.container = document.getElementById("container");
    this.container.style.position = "relative";
    this.container.style.height = this.height + "px";
    this.container.style.width = this.width + "px";

    this.init = function () {
      var that = this;
      this.counter = 0;
      this.pipes = [];

      this.score = new Score();
      this.score.init(this.container);
      this.score.update(0);

      this.bird = new Bird();
      this.bird.init(this.container);



      this.gameStart = new Start(this.container);
      document.addEventListener("keyup", that.bird.update);


      this.removeStart = e => {
        if (e.keyCode == 32) {
          document.getElementById("startgame").remove();
          document.removeEventListener("keydown", this.removeStart);
          this.status = GAME_STATE.playing;
          console.log(this.gameStart);
        }
      };

      this.restartGame = function (e) {
        if (e.keyCode == 32) {
          document.getElementById("gameover").remove();
          that.container.innerHTML = "";
          this.status = GAME_STATE.start;
          game = new Game();
          game.init();
        }
      };

      if (this.status == GAME_STATE.start) {
        this.gameStart.init(this.container);
        document.addEventListener("keydown", this.removeStart);
        clearInterval(this.gameplay);
      }

      this.gameplay = setInterval(function () {
        if (that.status == GAME_STATE.playing) {
          if (that.counter % 100 == 0) {
            this.pipe = new Pipe();
            this.pipe.changeColor("green");
            this.pipe.init(this.container);
            that.pipes.push(this.pipe);
          }

          that.counter++;
          that.bird.drop();

          that.pipes.forEach(function (pipe) {
            pipe.update();

            // checking collision with pipes and the container's upper and lower border
            if (
              that.bird.x + that.bird.width >= pipe.x &&
              that.bird.x <= pipe.x + pipe.width &&
              (that.bird.y <= pipe.y + pipe.ht ||
                that.bird.y + that.bird.height >= pipe.ht + pipe.gap) || that.bird.y > 600 || that.bird.y < -30
            ) {
              that.status = GAME_STATE.over;

              this.gameOver = new GameOver();
              this.gameOver.init(that.container);
              document.addEventListener("keydown", that.restartGame);
              clearInterval(this.gameplay);
            }

            if (pipe.x <= -50) {
              //Score Update
              that.score.point += 1;
              if (that.score.point > highest) {
                window.localStorage.setItem('highest', that.score.point);
                highest = window.localStorage.getItem('highest');
              }
              console.log(that.score.point);

              that.score.update(that.score.point);

              //Pipe Remove
              that.pipes.shift();
              this.container.removeChild(this.container.childNodes[2]);
            }
          });
        }
      }, 1000 / 40);
    };
  }