var trex, trex_running;
var ground;
var invisibleGround;
var clouds;
var rand;
var PLAY = 1;
var gameState = PLAY;
var END = 0;
var score = 0;

function preload(){
  trex_running = loadAnimation("trex1.png", "trex3.png", "trex4.png");
  trex_collided = loadAnimation("trex_collided.png");
  ground_img = loadImage("ground2.png");
  cloud_img = loadImage("cloud.png");
  obstacle1_img = loadImage("obstacle1.png");
  obstacle2_img = loadImage("obstacle2.png");
  obstacle3_img = loadImage("obstacle3.png");
  obstacle4_img = loadImage("obstacle4.png");
  obstacle5_img = loadImage("obstacle5.png");
  obstacle6_img = loadImage("obstacle6.png");
  gameOver_img = loadImage("gameOver.png");
  restart_img = loadImage("restart.png");
}

function setup(){
  createCanvas(600,200);
  edges = createEdgeSprites();

  //create a trex sprite
  trex = createSprite(50, 180, 20, 50);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("collided", trex_collided);
  trex.scale = 0.5;
  trex.debug = false;
  trex.setCollider("circle", 0, 0, 25);

  ground = createSprite(200, 180, 400, 20);
  ground.addImage("ground", ground_img);
  ground.velocityX = -5;
  ground.x = ground.width / 2;

  invisibleGround = createSprite(200, 185, 800, 10);
  invisibleGround.visible = false;

  obstaclesGroup = new Group();
  cloudsGroup = new Group();

  gameOver = createSprite(300, 100);
  gameOver.addImage(gameOver_img);
  gameOver.visible = false;
  gameOver.scale = 0.7;

  restart = createSprite(300, 130);
  restart.addImage(restart_img);
  restart.visible = false;
  restart.scale = 0.5;
}

function draw() { 

  background(180);
  text("Score: " +  score, 500, 50);
  console.log(score);

  if (gameState === PLAY) {
    if (keyDown("space") && trex.y >= 150) {
      trex.velocityY = -10;
    }
    trex.velocityY = trex.velocityY + 0.8

    if (ground.x < 0) {
      ground.x = ground.width / 2
    }

    spawnObstacles();
    spawnClouds();

    score = frameCount;

    if (obstaclesGroup.isTouching(trex)) {
      gameState = END;
    }

    
  }
  
  else if (gameState === END) {
    ground.velocityX = 0;
    trex.velocityY = 0;
    obstaclesGroup.setVelocityXEach(0);
    cloudsGroup.setVelocityXEach(0);
    cloudsGroup.setLifetimeEach(-1);
    obstaclesGroup.setLifetimeEach(-1);
    trex.changeAnimation("collided", trex_collided);
    gameOver.visible = true;
    restart.visible = true;
  }

  trex.collide(invisibleGround);
  background("white");
  drawSprites();
}

function spawnClouds() {
  if (frameCount % 60 === 0) {
    clouds = createSprite(600, 100, 20, 20);
    clouds.scale = 0.8;
    clouds.y = Math.round(random(30, 120))
    clouds.addImage("clouds", cloud_img);
    clouds.velocityX = -5;
    clouds.depth = trex.depth - 1
    trex.depth = trex.depth + 1
    console.log(trex.depth);
    console.log(clouds.depth);
    clouds.lifetime = 120;

    cloudsGroup.add(clouds);
  }

}

function spawnObstacles() {
  if (frameCount % 90 === 0) {
    obstacle = createSprite(600, 165, 10, 40);
    obstacle.velocityX = -7
    obstacle.lifetime = 300;
    rand = Math.round(random(1, 6))
    switch(rand) {
      case 1: obstacle.addImage(obstacle1_img)
      break;
      case 2: obstacle.addImage(obstacle2_img)
      break;
      case 3: obstacle.addImage(obstacle3_img)
      break;
      case 4: obstacle.addImage(obstacle4_img)
      break;
      case 5: obstacle.addImage(obstacle5_img)
      break;
      case 6: obstacle.addImage(obstacle6_img)
      break;
      default : break
    }
    obstacle.scale = 0.5;

    obstaclesGroup.add(obstacle);
  
  }
}