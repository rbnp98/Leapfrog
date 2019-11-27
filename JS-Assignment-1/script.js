
function Slider(className, index, holdTime){

    const carouselContainer = document.getElementsByClassName('className')[index];
    const carouselWrapper = document.getElementsByClassName('carousel-wrapper')[index];

    //Buttons
    const prevBtn = document.getElementsByClassName('prev-btn')[index];
    const nextBtn = document.getElementsByClassName('next-btn')[index];


    var images = document.getElementsByTagName('img');
    
    // Navigation dots
    var dot0 = document.getElementsByClassName('dot0')[index];
    var dot1 = document.getElementsByClassName('dot1')[index];
    var dot2 = document.getElementsByClassName('dot2')[index];
    var dot3 = document.getElementsByClassName('dot3')[index];
    
    const width = 640; //width of each image
    var count = 0; // index of the image, later used to decide how much does the wrapper should move
        
    this.holdTime = holdTime; //decides after how many miliseconds does the picture change

    
    //Displays next image
    function next(){
        count++;
        if(count > ((images.length / 2) - 1)){
            count = 0;
        }
        carouselWrapper.style.transition = 'transform 0.4s ease-in-out';
        console.log(count)
        carouselWrapper.style.transform = 'translateX(' + (-width * count) + 'px)';

        }

    
    //Displays previous image
    function previous(){
        count--;
        if(count < 0){
            count = ((images.length / 2) - 1);
        }
        carouselWrapper.style.transition = 'transform 0.4s ease-in-out';
        carouselWrapper.style.transform = 'translateX(' + (-width * count) + 'px)';
    }       

    
    //Using navigation dots to navigate through images
    function dotSlide(n){
        count = n;
        carouselWrapper.style.transition = 'transform 0.4s ease-in-out';
        carouselWrapper.style.transform = 'translateX(' + (-width * count) + 'px)';
    }

    
    // slide to the next image
    nextBtn.addEventListener('click',next);


    // slide to the previous image
    prevBtn.addEventListener('click', previous);

    
    // automatic sliding 
    setInterval(next, this.holdTime);

    
    // making navigation dots clickable
    dot0.addEventListener('click', function(){
                                            dotSlide(0);});

    dot1.addEventListener('click',  function(){
                                            dotSlide(1);});
    
    dot2.addEventListener('click', function(){
                                            dotSlide(2);});
        
    dot3.addEventListener('click',  function(){
                                            dotSlide(3);});

}


var slider1 = new Slider('carousel-container', 0, 10000);

var slider2 = new Slider('carousel-container', 1, 12000);
