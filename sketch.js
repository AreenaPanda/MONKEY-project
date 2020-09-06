// creating variable
var backImage,backgrd;
var monkey, monkey_running , monkey_collided;
var ground;

var FoodGroup, bananaImage;
var ObstaclesGroup, obstacle_img;

var gameOver;
var score=0;

function preload(){
  //preloading images 
backImage=loadImage("jungle2.jpg");

monkey_running=loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");

monkey_collided=loadImage("Monkey_collided.png");
obstacle_img = loadImage("stone.png");
bananaImage = loadImage("Bananas.png");
            }

function setup() {
  
   createCanvas(800,400);
  
  //creating objects
  backgrd=createSprite(0,0,800,400);
  backgrd.addImage(backImage);
  backgrd.scale=1.4;
  backgrd.x=backgrd.width/2;
  backgrd.velocityX=-4;
  
  monkey = createSprite(90,300,20,50);
  monkey.scale=0.1
  monkey.addAnimation("Running",monkey_running);
  monkey.debug = false ; 
 
  ground = createSprite(335,335,900,10);
  ground.visible = false ;
  
   ObstaclesGroup = new Group();
   FoodGroup = new Group();

  score = 0;
}

function draw() {
  background(220);
  
  edge = createEdgeSprites();
  monkey.collide(ground);
   
    //to move monkey
  if(keyDown("space") && monkey.y >= 259) {
       monkey.velocityY = -14  ; 
    }
  
    //gravity
    monkey.velocityY = monkey.velocityY + 0.8
  
    //to move backgroun
  if (backgrd.x < 0){
      backgrd.x = backgrd.width/2;
    }
  
    //score increases
  if(FoodGroup.isTouching(monkey)){
     score = score+1;
    FoodGroup.destroyEach();
    //monkey.scale= monkey.scale + 0.01 ;
    
     }
  switch(score){
    case 1 : monkey.scale=0.12;   
    break ; 
    case 5 : monkey.scale=0.14;   
    break ;
    case 10 : monkey.scale=0.16;   
    break ;
    case 15 : monkey.scale=0.18;   
    break ;
    case 20 : monkey.scale=0.20;   
    break ;
    }
    
    //spawn ObstaclesGroup && FoodGroup 
    spawnObs();
    spawnFood();
  
  if(ObstaclesGroup.isTouching(monkey)){  
    monkey.scale = 0.1;
  }
  
  drawSprites();
  
  //scoreing setup
  stroke("white");
  fill("white");
  textSize(20);
  textFont("georgia");
  text("Survival Time : "+ score, 250,130);
}

function spawnObs() {
  //code written over here to spawn the Obstacles
  if (frameCount % 100 === 0) {
    var obs = createSprite(750,295,40,10);
    obs.addImage(obstacle_img);
    obs.scale = 0.1;
    obs.velocityX = -6;
    obs.setCollider("circle",0,0,200);
    //obs.debug = true ;
    
     //assign lifetime to the obs
    obs.lifetime = 150;
    
    //add each obs to the group
    ObstaclesGroup.add(obs);
  }
}

function spawnFood() {
  //code written over here to spawn the Food
  if (frameCount % 80 === 0) {
    var food = createSprite(750,195,40,10);
    food.y = Math.round(random(200,220));
    food.addImage(bananaImage);
    food.scale = 0.01;
    food.velocityX = -6;
    food.setCollider("circle",0,0,30);
   // food.debug = true ;
    
     //assign lifetime to the food
    food.lifetime = 150;
    
    //add each food to the group
    FoodGroup.add(food);
  }
}
