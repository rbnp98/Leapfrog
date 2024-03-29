// window.localStorage.setItem('highest', 0); //To reset highscore
var bulletFlag = 1;
var bulletFire = 0;
//===============================================CLASS CAR=============================================================
function Car(parentElement) {
  this.x = 10;
  this.y = 10;
  this.speed = 5;
  this.width = 60;
  this.height = 100;
  this.element = null;
  this.parentElement = parentElement;
  var that = this;

}


Car.prototype.init = function () {
  var car = document.createElement('div');
  car.style.height = this.height + 'px';
  car.style.width = this.width + 'px';
  car.classList.add('car');
  this.parentElement.appendChild(car);
  this.element = car;
  this.draw();

  return this;
};


Car.prototype.setPostion = function (x, y) {
  this.x = x;
  this.y = y;
};

Car.prototype.draw = function () {
  this.element.style.left = this.x + 'px';
  this.element.style.bottom = this.y + 'px';
};


//==============================================CLASS ENEMY CAR (subclass of CAR)===============================================================================
function EnemyCar(...args) {
  Car.apply(this, args);



}

EnemyCar.prototype = Object.create(Car.prototype);
EnemyCar.prototype.move = function (counter) {
  this.y -= this.speed;
  this.speed += 0.0015;

  this.draw()
}


//==============================================CLASS MY CAR (subclass of CAR) ==============================================================
function MyCar(...args) {
  Car.apply(this, args);
  this.directions = [138, 210, 282]; // directions available for the player to move [left of three different lanes]

}

MyCar.prototype = Object.create(Car.prototype);
MyCar.prototype.move = function (key) {
  if ((key.keyCode == '65' || key.keyCode == '37') && this.x == 210) {
    this.x = 210 - 72;
  }
  if ((key.keyCode == '65' || key.keyCode == '37') && this.x == 282) {
    this.x = 282 - 72;
  }
  if ((key.keyCode == '68' || key.keyCode == '39') && this.x == 210) {
    this.x = 210 + 72;
  }
  if ((key.keyCode == '68' || key.keyCode == '39') && this.x == 138) {
    this.x = 138 + 72;
  }

  this.draw()
}


//============================================FUNCTION TO CALCULATE RANDOM NUM==================================================================
function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}

//=========================================CLASS BULLET=================================================================================
function Bullet(parentElement) {
  this.x = shufflePosition([153, 226, 300])[0];
  this.y = 10;
  this.speed = 5;
  this.width = 30;
  this.height = 38;
  this.element = null;
  this.parentElement = parentElement;
  var that = this;
  this.init = function () {
    var bullet = document.createElement('div');
    bullet.style.height = this.height + 'px';
    bullet.style.width = this.width + 'px';
    // bullet.style.display = 'none';
    bullet.classList.add('bullet');
    this.parentElement.appendChild(bullet);
    this.element = bullet;
    this.draw();

    return this;
  };

  this.setPostion = function (x, y) {
    this.x = x;
    this.y = y;
  };

  this.draw = function () {
    this.element.style.left = this.x + 'px';
    this.element.style.bottom = this.y + 'px';
  };

  this.move = function (key) {

    if ((key.keyCode == '32' || key.keyCode == '38') && this.y == 10 && bulletFlag == 0) {
      bulletFire = 1;


    }
    if ((key.keyCode == '65' || key.keyCode == '37') && this.x == 226 && bulletFire == 0) {
      this.x = 226 - 73;
    }
    if ((key.keyCode == '65' || key.keyCode == '37') && this.x == 300 && bulletFire == 0) {
      this.x = 300 - 74;
    }
    if ((key.keyCode == '68' || key.keyCode == '39') && this.x == 226 && bulletFire == 0) {
      this.x = 226 + 74;
    }
    if ((key.keyCode == '68' || key.keyCode == '39') && this.x == 153 && bulletFire == 0) {
      this.x = 153 + 73;
    }

    this.draw()
  };

}


//============================================FUNCTION TO GET RANDOM PERMUTATION OF ARRAY===============================================
function shufflePosition(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}


//=======================================================CLASS GAME======================================================================
function Game(parentElement) {
  var WIDTH = 474;
  var CONTAINER_HEIGHT = 600;
  var WRAPPER_HEIGHT = 140000;
  var enemyCars = [];
  var myCar = null;
  var bullet = null;
  var highest = window.localStorage.getItem('highest');
  var scoreboard = document.createElement('div');
  var highscore = document.createElement('div');
  var totalScore = document.createElement('div');
  var gameName = document.createElement('div');
  var newGame = document.createElement('div');
  var appWrapper = document.createElement('div');
  var gameOver = document.createElement('div');
  var restart = document.createElement('div');

  this.parentElement = parentElement;
  score = 0;
  var that = this;

  //===========================Scoreboard======================
  scoreboard.setAttribute('class', 'scoreboard');
  scoreboard.style.width = '474px';
  scoreboard.style.height = '48px';
  scoreboard.style.background = 'black';
  scoreboard.innerHTML = 'The Lane Rusher';
  scoreboard.style.textAlign = 'left';
  scoreboard.style.color = '#e60b00';
  scoreboard.style.display = 'none';
  scoreboard.style.left = '0px';
  scoreboard.style.top = '0px';
  scoreboard.style.fontFamily = 'Arial Black';
  parentElement.appendChild(scoreboard);

  highscore.innerHTML = 'Highest <br>' + highest;
  highscore.style.width = '220px';
  highscore.style.textAlign = 'right';
  highscore.style.color = 'white';
  highscore.style.fontSize = '20px';
  highscore.style.float = 'right';
  highscore.style.display = 'inline-block';
  highscore.style.fontFamily = 'Verdana';
  scoreboard.appendChild(highscore);

  totalScore.innerHTML = '0';
  totalScore.style.textAlign = 'center';
  totalScore.style.fontSize = '45px';
  totalScore.style.color = 'white';
  totalScore.style.float = 'right';
  totalScore.style.fontFamily = 'Verdana';
  scoreboard.appendChild(totalScore);

  this.scoreboard = scoreboard;


  //===========================Start Screen======================== 
  // Game name div
  gameName.setAttribute('class', 'game-name');
  gameName.style.width = '204px';
  gameName.style.left = '138px';
  gameName.style.top = '160px';
  gameName.style.fontFamily = 'Verdana';
  gameName.style.color = '#e60b00';
  gameName.style.fontSize = '45px';
  gameName.style.fontFamily = 'Arial Bold';
  gameName.style.fontWeight = 'bold';
  gameName.style.textAlign = 'left';
  gameName.innerHTML = 'THE LANE <br> RUSHER';
  this.gameName = gameName;
  parentElement.appendChild(gameName);

  //start div
  newGame.setAttribute('class', 'new-game');
  newGame.style.width = '204px';
  newGame.style.height = '60px';
  newGame.style.left = '138px';
  newGame.style.top = '360px';
  newGame.style.color = '#ffe203';
  newGame.style.fontSize = '30px';
  newGame.style.fontFamily = 'Verdana';
  newGame.style.fontWeight = 'bold';
  newGame.style.textAlign = 'center';
  newGame.style.cursor = 'pointer';
  newGame.style.textDecoration = 'underline';
  newGame.innerHTML = "Start<br><br><img src='images/mycar.png'>";
  this.newGame = newGame;
  parentElement.appendChild(newGame);

  //===========================Road and background======================== 
  appWrapper.style.height = '140000px';
  appWrapper.style.width = '474px';
  appWrapper.style.bottom = '0px';
  appWrapper.setAttribute('class', 'app-wrapper');
  appWrapper.style.backgroundImage = "url('images/bg.png')";

  parentElement.appendChild(appWrapper);

  //===========================game over and restart div======================== 
  gameOver.setAttribute('class', 'game-over');
  gameOver.style.width = '204px';
  gameOver.style.height = '120px';
  gameOver.style.display = 'none';
  gameOver.style.left = '138px';
  gameOver.style.top = '280px';
  gameOver.style.fontFamily = 'Verdana';
  gameOver.style.color = '#e60b00';
  gameOver.style.fontSize = '30px';
  gameOver.style.fontWeight = 'bold';
  gameOver.style.textAlign = 'center';
  gameOver.innerHTML = 'GAME OVER';
  parentElement.appendChild(gameOver);

  restart.setAttribute('class', 'restart');
  restart.style.width = '204px';
  restart.style.height = '60px';
  restart.style.display = 'none';
  restart.style.left = '138px';
  restart.style.top = '340px';
  restart.style.color = '#dbdb07';
  restart.style.fontSize = '25px';
  restart.style.fontFamily = 'Verdana';
  restart.style.fontWeight = 'bold';
  restart.style.textAlign = 'center';
  restart.style.cursor = 'pointer';
  restart.style.textDecoration = 'underline';
  restart.addEventListener('click', function () {
    window.location.reload();
  });
  restart.innerHTML = 'Play Again';
  parentElement.appendChild(restart);


  //placing player's car
  this.placeMyCar = function () {
    myCar = new MyCar(this.parentElement).init();
    myCar.element.style.backgroundImage = "url('images/mycar.png')";
    myCar.setPostion(210, 5); //at the bottom of container and middle lane
    myCar.draw();
  }

  //placing opponent's car
  this.placeEnemyCar = function () {
    for (var bottom = WRAPPER_HEIGHT - CONTAINER_HEIGHT; bottom > CONTAINER_HEIGHT; bottom = bottom - getRandomArbitrary(350, 600)) {
      var xPositions = shufflePosition([138, 210, 282]);// array of possible values of left for our enemy cars shuffled randomly
      for (var i = 0; i < getRandomArbitrary(0, 2); i = i + 1) {
        var enemyCar = new EnemyCar(this.parentElement).init();
        enemyCar.element.style.backgroundImage = "url('images/enemycar.png')";
        enemyCar.setPostion(xPositions[i], bottom);
        enemyCar.draw();
        enemyCars.push(enemyCar);
      }
    }
  }

//plaving bullet
  this.placeBullet = function () {
    bullet = new Bullet(this.parentElement).init();
    bullet.element.style.backgroundImage = "url('images/bullet.png')";
    bullet.draw();
  }

  this.moveBullet = function (key) {
    this.key = key;
    bullet.move(key);
  }


  //moving player's car, key is the key player pressed
  this.moveMyCar = function (key) {
    this.key = key;
    myCar.move(key);
  }



  this.startGame = function () {
    var counter = 0; //counter for frames per second
    var bottom = 0; //initial bottom val of wrapper
    var speed = 2;// speed of changing wrapper
    var bottomOfEnemy = 0

    this.placeMyCar();//place player's car
    this.placeEnemyCar();//place enemy's car
    this.placeBullet();

    function moveRoadAndEnemy(timestamp) {
      request = window.requestAnimationFrame(moveRoadAndEnemy);
      // translating the background downwards in a cyclic motion      
      bottom = bottom + speed;
      if (bottom >= WRAPPER_HEIGHT - CONTAINER_HEIGHT - 600) { // if translated beyond the container put the wrapper back at the top
        bottom = CONTAINER_HEIGHT;
      }

      appWrapper.style.bottom = (-bottom) + 'px';


      if (bulletFire) {

        bullet.y += 5;
        bullet.draw();
        bulletFlag = 1;
        for (var i = 0; i < enemyCars.length; i++) { // checking for bullet nd enemy car collision
          if ((bullet.element.style.display != 'none') && ((bullet.height + bullet.y) > enemyCars[i].y) &&
            (enemyCars[i].x < bullet.x) && (bullet.x < enemyCars[i].x + enemyCars[i].width)) {
            enemyCars[i].element.style.display = 'none';
            bullet.element.style.display = 'none';


          }
        }

        if (bullet.y > getRandomArbitrary(1200, 2000)) { // After bullets pass over the container they get generated fter a random time
          delete bullet;
          bullet = new Bullet(this.parentElement).init();
          that.placeBullet()
          bulletFire = 0;


        }
      }

      if (myCar.x < bullet.x && bullet.x < (myCar.x + myCar.width)) { bulletFlag = 0; }
      
      // translating the car downwards in a cyclic motion
      bottomOfEnemy = bottomOfEnemy + speed;
      for (var i = 0; i < enemyCars.length; i++) {
        if (enemyCars[i].y < -60) { //if the car moves 60px beyond the container put it back on top
          enemyCars[i].y = WRAPPER_HEIGHT;
          score++; //increase score as a car just passed by our players car
          if (score > highest) { //update highscore
            window.localStorage.setItem('highest', score);
            highest = window.localStorage.getItem('highest');

          }
          totalScore.innerHTML = score;
          highscore.innerHTML = 'Highest <br> ' + highest;

        }

        enemyCars[i].move(counter);  //move enemy car
        if (((myCar.height + myCar.y) >= enemyCars[i].y) && myCar.x == enemyCars[i].x && enemyCars[i].element.style.display != 'none') { //check for collision
          enemyCars[i].element.style.backgroundImage = "url(images/blast.png)";// change background of car to blast
          window.cancelAnimationFrame(request); //stop animation
          myCar.element.style.display = 'none';
          bullet.element.style.display = 'none';
          gameOver.style.display = 'block';// display gameover and restart
          restart.style.display = 'block';
        }




      }
      counter++;
      speed = speed + 0.0015;  //increase speed} //fixing the speed for some interval of timeand constant there after

    }
    window.requestAnimationFrame(moveRoadAndEnemy);
    window.addEventListener('keydown', function (key) {
      that.moveMyCar(key);
      that.moveBullet(key);
    }, false);

  }
}


//====================================Main======================================================
var parentElement = document.getElementsByClassName('app-container')[0];


var car1 = new Game(parentElement);


car1.newGame.addEventListener('click', function () {
  car1.gameName.style.display = 'none';
  car1.newGame.style.display = 'none';

  car1.scoreboard.style.display = 'block';


  car1.startGame();
});





