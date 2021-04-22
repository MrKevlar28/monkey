var backImage,backgr;
var player, player_running;
var ground,ground_img;

var END =0;
var PLAY =1;
var gameState = PLAY;
var foodGroup, obstaclesGroup;
var bananaImage;
var score = 0;

function preload(){
  backImage=loadImage("jungle.jpg");
  player_running = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  bananaImage = loadImage("banana.png");
  stone = loadImage("stone.png")
}

function setup() {
  createCanvas(800,400);
  
  backgr=createSprite(0,0,800,400);
  backgr.addImage(backImage);
  backgr.scale=1.5;
  backgr.x=backgr.width/2;
  backgr.velocityX=-4;
  
  player = createSprite(100,340,20,50);
  player.addAnimation("Running",player_running);
  player.scale = 0.1;
  
  ground = createSprite(400,350,800,10);
  ground.x=ground.width/2;
  ground.visible=false;

  foodGroup = new Group();
  obstaclesGroup = new Group();
  
}

function draw() { 
  background(0);
  drawSprites();

  if(gameState===PLAY){
  
  if(backgr.x<100){
    backgr.x=backgr.width/2;
  }
  
    if(keyWentDown("space") ) {
      player.velocityY = -12;
    }
    player.velocityY = player.velocityY + 0.8;
  
    player.collide(ground);

    spawnFood();
    spawnObstacles();
    if(foodGroup.isTouching(player)){
      foodGroup.destroyEach();
      score = score + 2;
      player.scale += +0.1;
    }
    
    
  }
  if(player.isTouching(obstaclesGroup)){
    gameState === END;
  }
  if(gameState === END){
    backgr.velocityX = 0;
    player.visible = false;

    foodGroup.destroyEach();
    obstaclesGroup.destroyEach();

    textSize(30);
    fill(255);
    text("Game Over!", 300, 220);
  }

  
}
function spawnFood(){
    if(frameCount % 80 === 0){
      var rand1 = random(120,200);
      var banana = createSprite(600,250,40,10);
      banana.y = rand1;
      banana.addImage(bananaImage);
      banana.scale = 0.05;
      banana.velocityX = -4;

      banana.lifetime = 300;
      player.depth = banana.depth + 1;
      foodGroup.add(banana);
      
    }  
}
function spawnObstacles(){
  if(frameCount % 60 === 0){
    var obstacles = createSprite(400,340,20,20);
    obstacles.addImage(stone);
    obstacles.scale = 0.5;
    obstacles.velocityX = -5;
    obstacles.lifetime = 350;
    obstaclesGroup.add(obstacles);
  }
}
