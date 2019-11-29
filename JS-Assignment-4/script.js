// //============================================================================================================
//   function Car(parentElement) {
//     this.x = 10;
//     this.y = 10;
//     this.speed = 1;
//     this.width = 160;
//     this.height = 160;
//     this.element = null;
//     this.parentElement = parentElement;
//     var that = this;
    
//     // this.move = function() {
//     //   this.x += this.speed;
//     //   this.y += this.speed;
//     //   this.draw();
//     // }
//   }


// Car.prototype.init = function(first_argument) {
//       var car = document.createElement('div');
//       car.style.height = this.height + 'px';
//       car.style.width = this.width + 'px';
//       car.classList.add('car');
//       this.parentElement.appendChild(car);
//       this.element = car;
//       this.draw();

//       return this;
// };


// Car.prototype.setPostion = function(x,y) {
//    this.x = x;
//    this.y = y;
// };

// Car.prototype.draw = function() {
//   this.element.style.left = this.x + 'px';
//   this.element.style.top = this.y + 'px';
// };

// //=============================================================================================================================
// function EnemyCar(...args){
//     Car.apply(this, args);
    
// }

// EnemyCar.prototype = Object.create(Car.prototype);
// EnemyCar.prototype.move = function(){
//   this.y += this.speed;
//   this.draw()
// }

//  //============================================================================================================
// function MyCar(...args){
//     Car.apply(this, args);

// }

// MyCar.prototype = Object.create(Car.prototype);
// MyCar.prototype.move = function(){
//   this.x += this.speed;
//   this.draw()
// }

// //==============================================================================================================

  
  









//   function getRandomArbitrary(min, max) {
//     return Math.random() * (max - min) + min;
//   }


//   function shufflePosition(array) {
//   var currentIndex = array.length, temporaryValue, randomIndex;

//   // While there remain elements to shuffle...
//   while (0 !== currentIndex) {

//     // Pick a remaining element...
//     randomIndex = Math.floor(Math.random() * currentIndex);
//     currentIndex -= 1;

//     // And swap it with the current element.
//     temporaryValue = array[currentIndex];
//     array[currentIndex] = array[randomIndex];
//     array[randomIndex] = temporaryValue;
//   }

//   return array;
// }
//   function Game(parentElement) {
//     var xPositions= shufflePosition([0, 160, 320]);
//     var appWrapper = document.createElement('div');
//     // appWrapper.style.height = '1000px';
//     appWrapper.style.width = '480px';
//     appWrapper.style.left=0;
//     appWrapper.style.bottom = 0;
//     appWrapper.setAttribute('class', 'app-wrapper');
//     parentElement.appendChild(appWrapper);
    


//     var MAX_WIDTH = 480;
//     var MAX_HEIGHT = 5000;
//     this.parentElement = appWrapper;


//     this.placeEnemyCar = function(){
//     for(var row = 0; row < 27; row * 27){
//       for(var col =0; col < 1; col++){
//            var enemyCar = new EnemyCar(this.parentElement).init();
//            enemyCar.element.style.background = 'green';/*"url('images/enemy.png')"*/
//            enemyCar.setPostion(row,xPositions[col]);
//            enemyCar.draw();
//         }
//       }
//     }
//     this.startGame = function() {

//       //this.placeEnemyCar();

//         // var myCar = new MyCar(parentElement).init();
//         // myCar.element.style.background = 'red';    /*"url('images/enemy.png')"*/
//         //  myCar.setPostion(160,(MAX_HEIGHT-myCar.height)); 
//         //  myCar.draw();   


//   // this.moveCars = function() {
//   //   for(var i=0; i< this.boxCount; i++) {
//   //     boxes[i].move();
        

//   }
  


// }


//   var parentElement = document.getElementById('app');

//   var car = new Game(parentElement).startGame();
var counter = 0
var bottom = 0;
var speed  = 1;
var appWrapper = document.getElementsByClassName('app-wrapper')[0];


        function next(timestamp){
          request = window.requestAnimationFrame(next);        

          bottom  = bottom + speed;
          if(bottom >= 13360){
            bottom = 0;console.log('a');
          }
        

          appWrapper.style.bottom = (-bottom) + 'px';
          counter++;
          if(counter < 1000){ speed = speed + 0.01;}

            console.log(counter);
            



          // speed = speed * 1.0012;

        }

       window.requestAnimationFrame(next);        
