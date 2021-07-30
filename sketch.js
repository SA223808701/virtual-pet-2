var dog,sadDog,happyDog;
var database;
var foodS,foodStock;
var lastFed;

function preload(){
   sadDog=loadImage("Images/Dog.png");
   happyDog=loadImage("Images/happy dog.png");
  }

//Function to set initial environment
function setup() {
  database=firebase.database();
  createCanvas(600,500);

  dog=createSprite(250,300,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;


  foodObj = new Food();

 

  feed  = createButton("Feed The Dog");
  feed.position(600,100);
  feed.mousePressed(feedDog);

  addFood = createButton("Add Food");
  addFood.position(490,100);
  addFood.mousePressed(addFoodS);

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
  textSize(20); 
}

// function to display UI
function draw() {
  background("orange");

  
 foodObj.display();
 

 fedTime = database.ref('Feed Time')
 fedTime.on("value", function(data){
lastFed = data.val()


 })

 fill(255,255,254)
 textSize(15);
 if(lastFed<= 12){
text("Last Feed: "+ lastFed%12 +"PM", 350,30);


 } else if(lastFed===0){
text("Last Feed: 12 AM", 350,30 );


 }else{
   text("Last Feed: "+lastFed+"AM",350,30);
 }

  drawSprites();
  fill(255,255,254);
  stroke("black");
  text("Food remaining: "+foodS,170,200);
  textSize(13);
  text("Note: Press UP_ARROW Key To Feed Drago Milk!",130,10,300,20);
}

//Function to read values from DB
function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}

//Function to write values in DB
function writeStock(x){
  if(x<=0){
    x=0;
  }else{
    x=x-1;
  } 
  database.ref('/').update({
    Food:x
  })
}

function feedDog(){
dog.addImage()

var food_stock_val = foodObj.getFoodStock();

if(food_stock_val<=0){
  foodObj.updateFoodStock(food_stock_val * 0);

}else {
  foodObj.updateFoodStock(food_stock_val-1);
}

foodObj.updateFoodStock(foodObj.getFoodStock()-1);
database.ref('/').update({
  Food:foodObj.getFoodStock(),
  FeedTime:hour()
})

}

function addFoodS(){
  foodS++;
  database.ref('/').update({
 Food:foodS



  })
}