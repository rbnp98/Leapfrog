var download;
var runBest;

// class Environment
// creating all the required static elements
class Environment {
  constructor(gameObj) {
    this.scoreval;
    this.highestval;
    this.generationVal;
    this.aliveVal;
    this.mutationVal;
    this.rate1;
    this.rate2;
    this.rate3;
    this.setupCanvas(gameObj);
    this.setupSidePanel(gameObj);
    this.setupSidePanel = this.setupSidePanel.bind(this);
  }

  // Create canvas
  setupCanvas(gameObj) {
    gameObj.container = document.createElement("div");
    gameObj.container.setAttribute("id", "container");
    document.body.appendChild(gameObj.container);
    
    gameObj.canvas = document.createElement("canvas");
    gameObj.canvas.setAttribute("id", "canvas");
    gameObj.canvas.style.float = "left";
    gameObj.ctx = gameObj.canvas.getContext("2d");
    gameObj.container.appendChild(gameObj.canvas);
    gameObj.canvas.width = WIDTH;
    gameObj.canvas.height = HEIGHT;
  }

  // Create Side panel to show information
  setupSidePanel(gameObj) {
    gameObj.config = document.createElement("div");
    gameObj.config.setAttribute("id", "config");
    gameObj.config.style.marginLeft = "850px";

    // table for stats
    var table = document.createElement("table");
    table.setAttribute("id", "table");
    var score = document.createElement("tr"); // add score
    var scorename = document.createElement("td");
    scorename.style.paddingRight = "70px";
    scorename.innerHTML = "Score";
    this.scoreval = document.createElement("td");
    this.scoreval.innerHTML = gameObj.score;
    score.appendChild(scorename);
    score.appendChild(this.scoreval);
    table.appendChild(score);

    var highest = document.createElement("tr");// add highscore
    var highestname = document.createElement("td");
    highestname.style.paddingRight = "70px";
    highestname.innerHTML = "Highest";
    this.highestval = document.createElement("td");
    this.highestval.innerHTML = gameObj.score;
    highest.appendChild(highestname);
    highest.appendChild(this.highestval);
    table.appendChild(highest);

    var generation = document.createElement("tr");// add generation
    var generationName = document.createElement("td");
    generationName.style.paddingRight = "70px";
    generationName.innerHTML = "Generation";
    this.generationVal = document.createElement("td");
    this.generationVal.innerHTML = gameObj.generation;
    generation.appendChild(generationName);
    generation.appendChild(this.generationVal);
    table.appendChild(generation);

    var alive = document.createElement("tr");// add alive stat
    var aliveName = document.createElement("td");
    aliveName.style.paddingRight = "70px";
    aliveName.innerHTML = "Alive";
    this.aliveVal = document.createElement("td");
    this.aliveVal.innerHTML = gameObj.alive;
    alive.appendChild(aliveName);
    alive.appendChild(this.aliveVal);
    table.appendChild(alive);

    var mutation = document.createElement("tr");// mutation rate slider
    var mutationName = document.createElement("td");
    mutationName.style.paddingRight = "70px";
    mutationName.innerHTML = "Mutation rate";
    this.mutationVal = document.createElement("select");
    this.mutationVal.setAttribute("id", "rate");

    this.rate1 = document.createElement("option");
    this.rate1.setAttribute("value", "0.05");
    this.rate1.innerHTML = "0.05";
    this.mutationVal.appendChild(this.rate1);
    this.rate2 = document.createElement("option");
    this.rate2.setAttribute("value", "0.075");
    this.rate2.innerHTML = "0.075";
    this.mutationVal.appendChild(this.rate2);
    this.rate3 = document.createElement("option");
    this.rate3.setAttribute("value", "0.1");
    this.rate3.innerHTML = "0.1";
    this.mutationVal.appendChild(this.rate3);
    mutation.appendChild(mutationName);
    mutation.appendChild(this.mutationVal);
    table.appendChild(mutation);

    var fastForward = document.createElement("form"); // add speed slider
    fastForward.setAttribute("id", "faster");
    fastForward.innerHTML = "Game Speed<br>";
    var ffRange = document.createElement("input");
    ffRange.setAttribute("class", "speed");
    ffRange.setAttribute("type", "range");
    ffRange.setAttribute("min", "0");
    ffRange.setAttribute("max", "40");
    ffRange.setAttribute("value", "0");
    fastForward.appendChild(ffRange);

    download = document.createElement("button"); // add download button
    download.setAttribute("id", "download");
    download.addEventListener("click", function() {
      let currentBestBird = gameObj.birds[0].brain;
      let currentBestBirdJson = JSON.stringify(currentBestBird);
      var dataStr =
        "data:text/json;charset=utf-8," +
        encodeURIComponent(currentBestBirdJson);
      var downloadAnchorNode = document.createElement("a");
      downloadAnchorNode.setAttribute("href", dataStr);
      downloadAnchorNode.setAttribute("download", "best.json");
      downloadAnchorNode.click();
      downloadAnchorNode.remove();
    });
    download.innerHTML = "Download Best";

    runBest = document.createElement("button"); // add run best button
    runBest.setAttribute("id", "runBest");
    runBest.addEventListener("click", function() {
      gameObj.birds = [];
      gameObj.counter = 0;
      gameObj.pipes = [];
      gameObj.birds.push(bestBird); // pushing the saved optimum model of bird
      gameObj.score = 0;
    });
    runBest.innerHTML = "Load Best";

    // appending all the elements
    gameObj.config.appendChild(fastForward);
    gameObj.config.appendChild(table);
    gameObj.config.appendChild(download);
    gameObj.config.appendChild(runBest);

    gameObj.container.appendChild(gameObj.config);
  }

  updateInfo(gameObj) {
    this.scoreval.innerHTML = gameObj.score;
    this.highestval.innerHTML = gameObj.highscore;
    this.generationVal.innerHTML = gameObj.generation;
    this.aliveVal.innerHTML = gameObj.alive;
  }
}
