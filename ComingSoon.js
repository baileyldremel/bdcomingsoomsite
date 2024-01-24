var shapeConstructor = [{count:0, shapeColour:0, frameC:0}];
var counter = 0;

var backgroundColour = "";
var textColour = "";

// The colours being used
var blk = '#111111';
var pur = '#7020EB';
var blu = '#53E4C0';
var whi = '#F3FFFB';

// Co-ordinates for the corners of the shapes
let x1 = 116;
let x2 = 100.5;
let x3 = 19;
let y = 78.5;

var expansion;
var frame;

var shapeCol = 0;
var shp = '#111111';
var txt = '#7020EB';

var multi = 10;
var clickedFrame;

//These lines of code are specifically for Safari on mobilem as the mouseClicked function doesn't work on mobile Safari,

//Checks if the browser has the function of touch
const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

//Checks if the current browser is Safari
const isSafari = /^((?!chrome|android).)* safari/i.test(navigator.userAgent);

function setup() {
    
    //As the website has flashing images this alert is to alert the user of such
    alert('Warning: This website may contain flashing images')
    frameRate(60);
    createCanvas(windowWidth, windowHeight);
    
}


function draw() {

    background(blk);
    
    // Ensures that the expansion of the shape covers either the full width or height of the display
    if(width > height){
        expansion = width/2;
    }else{
        expansion = height/2;
    }
  
    //Translates everything so that it is centered on the screen
    
    translate(width/2, height/2);
    noStroke();
    fill(txt);
    
    //Brings the shapes 50 pixels than the center higher
    translate(0,-50);
    
    //This loops is the main function of the page, allowing the user to create multiple shapes every time they click that expand at a constant rate. 
    for(var i = 0; i <shapeConstructor.length; i++){
    
        //Sets the colour of the expanding shape and the text and solid shapes, based on the number in the shapeColour sequence.
        
        if(shapeConstructor[i].shapeColour == 0){
            shp = blk;
            txt = pur;
        }
    
        if(shapeConstructor[i].shapeColour == 1){
            shp = pur;
            txt = blu;
        }
    
        if(shapeConstructor[i].shapeColour == 2){
            shp = blu;
            txt = whi;
        }
    
        if(shapeConstructor[i].shapeColour == 3){
            shp = whi;
            txt = blk;
        }
    
    
    
        //The colour for the expanding shapes
        fill(shp);
        noStroke();
        
        //This takes the current frameCount and subtracts the frame that the user had clicked on so every shape has a different frame and can expand at different times.
        
        //The multiplier makes it go faster or slower
        clickedFrame = (frameCount-shapeConstructor[i].frameC)*multi;
    
        //Drawing the right shape, including the expansion of the shape
        push();
            beginShape();
                vertex(0-(clickedFrame),0-(clickedFrame));
                vertex(x1+(clickedFrame),0-(clickedFrame));
                vertex(x2+(clickedFrame),y+(clickedFrame));
                vertex(x3-(clickedFrame),y+(clickedFrame));
            endShape(CLOSE);
        pop();
     
        //Drawing the left shape, including the expansion of the shape
        push();
            beginShape();
                vertex(0+(clickedFrame),0-(clickedFrame));
                vertex(-x1-(clickedFrame),0-(clickedFrame));
                vertex(-x2-(clickedFrame),y+(clickedFrame));
                vertex(-x3+(clickedFrame),y+(clickedFrame));
            endShape(CLOSE);
        pop();
    }
  
    // This code allows for the clicked shape that was first created to be deleted after it reaches the size of the screen.
    
    //It allows for a smoother experience.
    for(var j = 0; j < shapeConstructor.length; j++){
        if((frameCount-shapeConstructor[j].frameC)*multi >= expansion && j != 0){
            shapeConstructor.shift();
        } 
    
    }
    
    //Drawing the right solid shape
    push();
        fill(txt);
        beginShape();
             vertex(0,0);
            vertex(x1,0);
            vertex(x2,y);
            vertex(x3,y);
        endShape(CLOSE);
    pop();
     
        //Drawing the left solid shape
    push();
        fill(txt);
        beginShape();
             vertex(0,0);
             vertex(-x1,0);
             vertex(-x2,y);
             vertex(-x3,y);
        endShape(CLOSE);
    pop();
    
    // Changing the text colour by talking to the html file and getting the text's ID.
    document.getElementById('text').style.color = txt;
  
}

function mouseClicked(){
    createShape();
}

function keyPressed(){
    createShape();
}

// This function is specifically created for mobile Safari browsers, as the above function doesn't work.
function touchEnded(){
    
    //Prevents other mobile browsers (such as Chrome) from doing this function as they have the capabilities of using the mouseClicked function when the user touches.
    if(isTouch && isSafari){
        createShape();
    }
}

function createShape(){
    
    //Everytime the mouse is clicked, it adds one to the counter and the shapeCol sequence
    counter++;
    shapeCol++;
    
    //Resets the shapeCol sequence back to 0
    if(shapeCol == 4){
        shapeCol = 0; 
    }
    
    //Takes the current frame
    frame = frameCount;
    
    
    //This pushes all these variables into an array that is used to create the expanding shapes when the user clicks.
    shapeConstructor.push({count:counter, shapeColour:shapeCol, frameC:frame});
    
}

function windowResized(){
    resizeCanvas(windowWidth, windowHeight);
}
