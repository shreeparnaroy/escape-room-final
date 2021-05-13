var pari,kidnapper,icecreamMan
var keyImage

var gameState=0
var key1 =0
var counter =0

function preload(){
pari_walk=loadAnimation("images/g1.png","images/g2.png","images/g6.png")
pari_stand=loadAnimation("images/g1.png")
pari_jump=loadAnimation("images/g4.png")
pari_hurt=loadAnimation("images/g5.png")
truckImage=loadImage("images/ic3.png")
icecreamManImage=loadImage("images/icecreamman.png")
kidnapper=loadImage("images/kidnapper.png")
keyImage=loadImage("images/key.png")
house=loadImage("images/house.jpg")
mountain=loadImage("images/mountain.jpg")
playground=loadImage("images/playground.jpg")
jungle1=loadImage("j1.jpg")
room=loadImage("images/room.jpg")
jungle2=loadImage("j2.jpg")
jungle3=loadImage("j3.jpg")

//load sounds here

}


function setup() {
  createCanvas(displayWidth,displayHeight);
  
  truck= createSprite(1200,550)
  truck.addImage(truckImage)
  truck.scale=2

  pari = createSprite(500,650)
  pari.addAnimation("image",pari_stand)
  pari.addAnimation("run", pari_walk)
  pari.scale=2.5

  icecreamMan=createSprite(730,550)
  icecreamMan.addImage(icecreamManImage)
  icecreamMan.scale=0.5

  button = createButton("NEXT");
  button.position(580,120)
  button.size(100,50)

  keyGroup = createGroup()
}


function draw() {
  background(playground);
  textSize(50);
  strokeWeight(7)
  
  fill("black")
  truck.visible=true
  icecreamMan.visible=true
  //playground sceen
  if(gameState===0){
    //playground image where pari is playing
    text("CLICK ON NEXT TO SEE THE CONVERSATION",200,80)
    //icecreamtruck.visible=true after some time
    button.mouseClicked(function(){  counter++})
    
      
      if(counter ===1){
        textSize(50);  
        stroke("pink") 
        strokeWeight(4) 
        text("hello good evening\ncan I please have\n chocolate icecream?",50,450)
        console.log(counter)
      }
      else if(counter ===2){
        textSize(50);
        stroke("lightblue") 
        strokeWeight(4)  
        text("I am so sorry dear \nwe just ran out of chocolate icecream \nwould you like to try our\n speacial flavour",200,200)
        console.log(counter)
      }
      else if(counter ===3){
        textSize(50); 
        stroke("pink") 
        strokeWeight(4)  
        text("ohh yes !!\n that would be amazing\n I would like to try some sir",50,450)
        console.log(counter)
      }
      else if(counter === 4){
        textSize(50); 
        stroke("lightblue") 
        strokeWeight(4) 
        text("its a trap\n I am  kidnapping you!!! ",500,200)
        icecreamMan.addImage(kidnapper)
        icecreamMan.scale=2
        stroke("pink")
        text("helpppp someone save me helppp",20,450)
        console.log(counter)
      }
      else if(counter ===5) {
        console.log(counter)
        gameState =1
        truck.x=-100
      }
      
         
      
  
  }

  if(gameState===1){
    console.log(gameState)
    //icrcream truck through jumgle\
   
    background(jungle1)
    icecreamMan.visible=false;
    pari.visible=false;
    truck.velocityX=4 
    fill("white") 
   text("CLICK ON NEXT TO SEE WHAT HAPPENS",200,80)
    if(truck.x>windowWidth-200){
       truck.x=50
    truck.velocityX=4

    }
    button.mouseClicked(()=>{gameState=2})
  }

  if(gameState===2){
    //instruction pari can jump,slice,walk,and is very intilligent
    background("lightpink")
    truck.visible=false
    icecreamMan.visible=false;
    pari.visible=false;
    text("THE ESCAPE ROOM ",500,80)
    text("These are the instruction to move pari\nplease help her escape from the nasty kidnapper\nby collecting 7 keys from the room \npress UP_ARROW to move up\nPress DOWN_ARROW to move down\npress LEFT_ARROW to move left\npress RIGHT_ARROW to move right",250,200)
    button.position(500,620)
    button.mouseClicked(()=>{gameState=3})
  }

  if(gameState===3){
    //pari locked in room
    truck.visible=false
    icecreamMan.visible=false
    pari.visible=true;
    button.hide()
    background(room)
    //pari searches for clues. 7 keys at random positions with different scale. 
    textSize(40)
    fill("white")
    text("keys colleted: "+key1, 400,50)
    spawnKeys()
    if(keyDown("up")){
      pari.y=pari.y-15
    }
    
    if(keyDown("down")){
      pari.y=pari.y+15
    }
    
    if(keyDown("left")){
      pari.x=pari.x-15
    }
    
    if(keyDown("right")){
      pari.x=pari.x+15
    }
    
    if(pari.isTouching(keyGroup)){
      key1=key1+1
      
      keyGroup.destroyEach()
    }
    
    if(key1===7){
      //pari opens door
      gameState=4
      pari.x = -20
      pari.y = displayWidth/2
    }
  }

  if(gameState===4){
    //jungle run
    truck.visible=false
    icecreamMan.visible=false
    button.hide()
    background(jungle3)
    textSize(40)
    fill("white")
    text("Pari has successfully collected 7 keys and has escaped",200,200)
    
    pari.velocityX = 10
    pari.changeAnimation("run",pari_walk)

    if(pari.x >displayWidth+30){
      gameState = 5
    }
  }

  if(gameState===5){
    background(house)
    //reach hom and complain police and they kidnapper in jail
    truck.visible=false
    icecreamMan.visible=false

    pari.changeAnimation("image",pari_stand)
    pari.x = 170
    pari.y = 600
    pari.scale =3.9
    
    textSize(40)
    strokeWeight(4)
    fill("black")
    text("Pari has reached Home",200,200)
    text("Congratulations you have helped pari escape \n you completed your task you win ",200,300)
    //button.html("restart")
    button.mouseClicked(()=>{gameState=0})
  }





  drawSprites();
}


//spawmn key at random position
function spawnKeys() {
  //write code here to spawn the clouds
  if (frameCount % 80 === 0) {
    var key = createSprite(600,120,40,10);
    key.x = Math.round(random(100,displayWidth-100));
    key.y = Math.round(random(100,displayHeight-100));
    key.addImage(keyImage);
    key.scale=0.5
    //key.velocityX = -3;
    key.lifetime = 80;
    keyGroup .add(key)
 
  }
}