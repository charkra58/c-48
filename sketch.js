var bgImg

var bear ,bearImg
var fish,fish1Img,fish2Img,fish3Img,fishImg

var bgSound
var fishGroup

var score=0
var PLAY =1
var END =0
var gameState = PLAY
var invisibleEnd

function preload() {
bgImg =loadImage("images/background1.png");
bearImg =loadImage("images/bear.png");
fishImg =loadImage("images/fish.png");
fish1Img =loadImage("images/fish1.png");
fish2Img =loadImage("images/fish2.png");
fish3Img =loadImage("images/fish3.png");	
bgSound =loadSound("sounds/bgSound.wav");
}

function setup() {
	createCanvas(800,800);
    bgSound.loop();
    bear = createSprite(400,400,30,30)
    bear.addImage("bear",bearImg)
    bear.scale =0.7

    fishGroup =new Group();
     invisibleEnd =createSprite(400,10,800,10);
     invisibleEnd.visible =false;
}

function draw() {
background(bgImg)
if(gameState === PLAY){
    bear.x=mouseX
    bear.y=mouseY
    
    if(bear.isTouching(fishGroup)){
        fishGroup[0].destroy();
        score+=1
    
    }
    
    spawnFish();
    drawSprites()
    createEdgeSprites();
    if(fishGroup.isTouching(invisibleEnd)){
       gameState=END
    }
}

if(gameState === END){
    bear.velocityY =0
    bear.velocityX =0
  fishGroup.velocityXEach(0);
  fishGroup.velocityYEach(0);
stroke("red")
textSize(50)
fill("black")    
text("GAME END",400,400)
}

stroke("black")
textSize(25)
fill("pink")
text("BEAR ATE FISHES : "+score,400,100);
}

function spawnFish() {
    if(frameCount%60 ===0){
        var fish =createSprite(400,800,15,15);
        fish.velocityY =-3-score/3
        fish.x =random(200,700)
        fish.scale =0.5
        var num =Math.round(random(1,4))
        switch(num){
            case 1: fish.addImage("fish",fishImg);
            break;
            case 2: fish.addImage("fish",fish1Img);
            break;
            case 3: fish.addImage("fish",fish2Img);
            break;
            case 4: fish.addImage("fish",fish3Img);
            default:break;
        }

        fishGroup.add(fish);
        createEdgeSprites();

        
    }
}