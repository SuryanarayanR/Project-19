var monkey,monkeyimage,invisibleground,ground,backgroundimage,bananagroup,
    bananaimage,obstaclegroup,obstacleimage,score;
    


function preload(){
  obstacleimage = loadImage("stone.png");
  backgroundimage = loadImage("jungle2.jpg");
  bananaimage = loadImage("Banana.png");
  monkeyimage = loadAnimation("Monkey_01.png","Monkey_02.png",                           "Monkey_03.png","Monkey_04.png","Monkey_05.png",                           "Monkey_06.png","Monkey_07.png","Monkey_08.png",                           "Monkey_09.png","Monkey_10.png");
} 

function setup() {
  createCanvas(600, 200);
  
  score = 0;
  
  ground = createSprite(300,1,600,200);
  ground.addImage("ground",backgroundimage); 
  ground.x = ground.width /2;
  ground.scale  = 1.3;
  
  monkey = createSprite(40,20,10,10);
  monkey.addAnimation("monkey",monkeyimage);
  monkey.scale = 0.1;
  
  invisibleground = createSprite(300,190,600,10);
  invisibleground.visible = false;
  
  obstaclegroup = new Group();
  bananagroup = new Group();
}

function draw() {
  background(220);
   
  food();
  obstacles();
  
  if (ground.x < 0){
    ground.x = ground.width/2;
  }
  ground.velocityX = -4;
  
  if(keyDown("space")){
    monkey.velocityY = -13; 
  }
  monkey.velocityY = monkey.velocityY + 0.8;
  monkey.collide(invisibleground);
  
  stroke("white");
  textSize(20);
  fill("white");
  text("Score:" + score,500,50);
  
  if(bananagroup.isTouching(monkey)){
    score = score+2 ;
    bananagroup.destroyEach();
  }
  
  if(obstaclegroup.isTouching(monkey)){
  monkey.scale = 0.09;
  }
  
  switch(score){
    case 10:monkey.scale = 0.12 ;
    break;
    case 20:monkey.scale = 0.14 ;
    break;  
    case 30:monkey.scale = 0.16 ;
    break;
    case 40:monkey.scale = 0.18 ;
    break;
    default:break;  
  }
  
  drawSprites();
  
  text("Score: "+ score, 270, 30);
  
}

function food () {
  if(frameCount % 80 === 0) {
    var banana = createSprite(550,random(20,150),10,10);
    banana.scale = 0.05;
    banana.addImage(bananaimage);
    banana.lifetime = 70;
    banana.velocityX = -8;
    bananagroup.add(banana);
  }
}

function obstacles () {
  if(frameCount % 300 === 0){
    var stone = createSprite(550,200,10,10);
    stone.addImage(obstacleimage);
    stone.scale = 0.2;
    stone.velocityX = -8;
    stone.lifetime = 95;
    obstaclegroup.add(stone);
  }
}

