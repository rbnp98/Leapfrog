//Class Box
function Box(parentElement, index) {
  var parentElement = document.getElementsByClassName(parentElement)[index || 0];
  this.x = 10;
  this.y = 10;
  this.speed = 1;
  this.width = getRandomArbitrary(15,25); // For generating multiple sized boxes 
  this.height = 20;
  this.element = null;
  this.parentElement = parentElement;
  var that = this;

  //Initializing a box and appending it to app
  this.init = function () {
    var box = document.createElement('div');
    var img = document.createElement('img');
    
    box.style.height = this.height + 'px';
    box.style.width = this.width + 'px';
    box.classList.add('box');
    this.parentElement.appendChild(box);
    img.style.width = 100+'%';
    img.setAttribute('src', 'images/ant.png');
    box.appendChild(img);
    this.element = box;
    this.element.onclick = this.boxClicked.bind(this);
    this.draw();

    return this;
  }

  this.setPostion = function(x, y) {
    this.x = x;
    this.y = y;
  }

  this.boxClicked = function () {
    console.log('boxClicked', this.width);
  }

  this.draw = function () {
    this.element.style.left = this.x + 'px';
    this.element.style.top = this.y + 'px';
  }

  this.move = function() {
    if(this.x < 25 || this.x > 475 || this.y < 25 || this.y > 475){this.speed = -this.speed} //Checking for boundary
    this.x += this.speed;
    this.y += this.speed;
    this.draw();
  }

  this.checkCollision = function(boxes){
    for(var i = 0; i < boxes.length; i++){
      var dx = this.x - boxes[i].x;
      var dy = this.y - boxes[i].y;
      var distance = Math.sqrt(dx * dx + dy * dy); //distance = sqrt(a^2 + b^2)
      if(distance < this.width && distance > 0){ // checking if distance is smaller than the box's width itself
       this.speed = -this.speed;
      }
    }
  }

  this.setClassAndEvent = function(i,index){ //setting class and onclick event 
    this.element.classList.add(i);
    this.element.setAttribute('onclick', 'destroyAnt('+i+','+index +')');
  }
}


function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}


//Class Game
function Game(parentElement, index, boxCount) {
  var boxes = [];
  var MAX_WIDTH = 500;
  var MAX_HEIGHT = 500;
  this.parentElement = parentElement;
  this.boxCount = boxCount || 10;
  this.startGame = function() {
  for(var i=0; i < this.boxCount; i++) {
    var box = new Box(parentElement, index).init();
    box.setClassAndEvent(i,index);
    box.setPostion(
      getRandomArbitrary(25, MAX_WIDTH - 25), 
      getRandomArbitrary(25, MAX_HEIGHT - 25));
    for( j in boxes){  //Checking for overlapping of generated boxes while drawing them first time
      var bx = box.x - boxes[j].x;
      var by = box.y - boxes[j].y;
      var bdistance = Math.sqrt(bx * bx + by * by);
      if(bdistance < box.width){
        box.setPostion(
          getRandomArbitrary(25, MAX_WIDTH - 25), 
          getRandomArbitrary(25, MAX_HEIGHT - 25));}
    }
    box.draw();
    boxes.push(box);
  }

  setInterval(this.moveBoxes.bind(this), 30)
  }

  this.moveBoxes = function() {
    for(var i=0; i< this.boxCount; i++) {
      boxes[i].move();
      boxes[i].checkCollision(boxes);
        

    }
  }
}


//Destroy ant on clicking
function destroyAnt(i, index){
  var ant = document.getElementsByClassName(i)[index];
  ant.style.display = 'none';
}  


new Game('app', 0, 15).startGame();
new Game('app', 1).startGame();