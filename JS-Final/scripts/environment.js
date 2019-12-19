var that;
var download;
var runBest;

class Environment{
    constructor(gameObj){
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
        that = this;

    }
    

    setupCanvas(gameObj){ 
        gameObj.container = document.getElementById('container');
    
        gameObj.canvas = document.createElement('canvas');
        gameObj.canvas.style.float = 'left';
        gameObj.ctx = gameObj.canvas.getContext('2d');
        gameObj.container.appendChild(gameObj.canvas);
        gameObj.canvas.width = WIDTH;
        gameObj.canvas.height = HEIGHT;
    }

    setupSidePanel(gameObj){
        gameObj.container = document.getElementById('container');
     
        gameObj.config = document.createElement('div');
        gameObj.config.style.marginLeft = '950px';

        var table = document.createElement('table');
        // table.style.float = 'left';
        table.style.display = 'block';

        table.style.fontFamily = 'Verdana';
        table.style.marginTop = '20px';
        //  table.style.display = 'inline';

        var score = document.createElement('tr');
        var scorename = document.createElement('td');
        scorename.style.paddingRight = '70px';
        scorename.innerHTML = 'Score';
        this.scoreval = document.createElement('td');
        this.scoreval.innerHTML = gameObj.score;
        score.appendChild(scorename);
        score.appendChild(this.scoreval);
        table.appendChild(score);
        
        var highest  = document.createElement('tr');
        var highestname = document.createElement('td');
        highestname.style.paddingRight = '70px';
        highestname.innerHTML = 'Highest';
        this.highestval = document.createElement('td');
        this.highestval.innerHTML = gameObj.score;
        highest.appendChild(highestname);
        highest.appendChild(this.highestval);
        table.appendChild(highest);

        var generation  = document.createElement('tr');
        var generationName = document.createElement('td');
        generationName.style.paddingRight = '70px';
        generationName.innerHTML = 'Generation';
        this.generationVal = document.createElement('td');
        this.generationVal.innerHTML = gameObj.generation;
        generation.appendChild(generationName);
        generation.appendChild(this.generationVal);
        table.appendChild(generation);

        var alive  = document.createElement('tr');
        var aliveName = document.createElement('td');
        aliveName.style.paddingRight = '70px';
        aliveName.innerHTML = 'Alive';
        this.aliveVal = document.createElement('td');
        this.aliveVal.innerHTML = gameObj.alive;
        alive.appendChild(aliveName);
        alive.appendChild(this.aliveVal);
        table.appendChild(alive);

        var mutation  = document.createElement('tr');
        var mutationName = document.createElement('td');
        mutationName.style.paddingRight = '70px';
        mutationName.innerHTML = 'Mutation rate';
        this.mutationVal = document.createElement('select');
        this.mutationVal.setAttribute('id', 'rate');

        this.rate1 = document.createElement('option');
        this.rate1.setAttribute('value', '0.025');
        this.rate1.innerHTML ='0.025';
        this.mutationVal.appendChild(this.rate1);
        this.rate2 = document.createElement('option');
        this.rate2.setAttribute('value', '0.05');
        this.rate2.innerHTML ='0.05';
        this.mutationVal.appendChild(this.rate2);
        this.rate3 = document.createElement('option');
        this.rate3.setAttribute('value', '0.1');
        this.rate3.innerHTML ='0.1';
        this.mutationVal.appendChild(this.rate3);
        mutation.appendChild(mutationName);
        mutation.appendChild(this.mutationVal);
        table.appendChild(mutation);

        var fastForward = document.createElement('form');
        fastForward.style.fontFamily = 'Verdana';
        fastForward.innerHTML = 'Game Speed<br>';
        var ffRange = document.createElement('input');
        ffRange.setAttribute('id', 'speed');
        ffRange.setAttribute('type', 'range');
        ffRange.setAttribute('min', '0');
        ffRange.setAttribute('max', '40');
        ffRange.setAttribute('value', '0');
        fastForward.appendChild(ffRange);

        download = document.createElement('button');
        download.addEventListener('click',function(){
                let currentBestBird = gameObj.birds[0].brain; 
                let currentBestBirdJson = JSON.stringify(currentBestBird);
                // window.localStorage(setItem)
                var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(currentBestBirdJson);
                console.log(currentBestBird);
                var downloadAnchorNode = document.createElement('a');
                downloadAnchorNode.setAttribute("href",     dataStr);
                downloadAnchorNode.setAttribute("download","best.json");
                // download.appendChild(downloadAnchorNode); // required for firefox
                downloadAnchorNode.click();
                downloadAnchorNode.remove();
                });
        download.setAttribute('id', 'download')
        download.innerHTML = 'Download Best';
        download.style.clear ='left';
        download.style.marginTop ='100px';

       runBest = document.createElement('button');
       runBest.addEventListener('click', function(){

        gameObj.birds = [];
        gameObj.counter = 0;
        gameObj.pipes = [];

        gameObj.birds.push(bestBird);
        gameObj.score = 0;
        runBest.disabled = 'true';


       });
  


        runBest.setAttribute('id', 'runBest')
        runBest.innerHTML = 'Load Best';
        runBest.style.clear ='left';
        runBest.style.marginTop ='100px';
        runBest.style.marginLeft ='50px';


       







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



    uploader(gameObj){
        
        let bestBird2 = localStorage.getItem('bestBird');
        let birdget = JSON.parse(bestBird2);
        console.log(birdget)

    }
      
    // getRate(e){
    //     var e = document.getElementsByTagName('select');
        
    //    var rate = e.options[e.selectedIndex].text;
    //     return rate;
    // }
}



