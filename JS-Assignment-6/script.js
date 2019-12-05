var canvas = document.getElementById('myCanvas');
var ctx = canvas.getContext('2d');
var phase = 0;
var time = 0.03;
var maxRadius = 5;
var move = true;
var frameCount = 0;
var numRows = 10;
var numCols = 15;
var numStrands = 2;
var y;
var amplitude = 50;
var rowOffset = 15;


function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  var x = 0
  var colOffset = 0;
  frameCount++;
  phase = frameCount * time;

  for (var strand = 0; strand < numStrands; strand++) {
    if (strand === 0) {
      var strandPhase = phase;
    } else {
      var strandPhase = phase + strand * Math.PI;
    }


    x = 0;
    for (var col = 0; col < numCols; col++) {

      if (rowOffset > 200) {
        move = false;
      }
      if (rowOffset <= 15) {
        move = true;
      }
      x = x + 32;
      colOffset = (col * 2 * Math.PI) / 15;


      for (var row = 0; row < numRows; row += 1) {

        if (move) {
          rowOffset = rowOffset + 0.01 + col / 1000;
          circleRadius = 15 + row - rowOffset / 14;
        }
        else {
          rowOffset = rowOffset - 0.01 - col / 1000;
          circleRadius = 15 - row - rowOffset / 10;
        }
        if (circleRadius > maxRadius) {
          circleRadius = maxRadius;
        }
        else if (circleRadius < 0) {
          circleRadius = 0;
        }

        var y = canvas.height / 2 + row * 10 + Math.sin(strandPhase + colOffset) * amplitude;
        ctx.beginPath();
        ctx.arc(x, y, circleRadius, 0, Math.PI * 2, false);
        ctx.fillStyle = '#ffae73';
        ctx.fill();
        ctx.closePath();
      }
    }
  }
}

setInterval(draw, 60);