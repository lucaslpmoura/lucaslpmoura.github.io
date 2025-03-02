let pointA = [0,0]
let pointB = [0,0]
let pointC = [0,0]
let oldPointA = [0,0];
let oldPointB = [0,0];
let oldPointC = [0,0]
let numOfClicks = 0;
let currentColor = [0,100,0];

let width = 1200;
let height = 900;

let drawWidth = 0.75 * width;



let triangles = [];
let autoGenerate = false;
let toggleDebug = true;

document.getElementById("auto_button").onclick = autoGenerateTriangles;
document.getElementById("toggle_debug").onclick = toggleDebugFunc;
document.getElementById("clear_triangles").onclick = clearTriangles;
document.getElementById("back_button").onclick = () => { location.href  = "../index.html"};

let slider;
let sliderList = [];
let baseGenerationInterval = 2000;

function setup() {
  createCanvas(width, height);
  slider = createSlider(0, 1500);
  slider.position(drawWidth + 10, 30); // Generation speed adjustment sliders
  slider.hide();
  slider.value(750);
}

function draw(){

  background(127);
  fill(100,100,100);
  rect(drawWidth, 0, width, height);
  if(numOfClicks % 3 == 0 && numOfClicks > 0){
    //clear();
    //background(127);
    //fill(200);
    generateTriangle(pointA[0], pointA[1], pointB[0], pointB[1], pointC[0], pointC[1], currentColor[0], currentColor[1], currentColor[2]);
    numOfClicks = 0;
  }

 

  //triangle(oldPointA[0], oldPointA[1], oldPointB[0], oldPointB[1], oldPointC[0], oldPointC[1])
  for(let i = 0; i < triangles.length; i++){
    fill(triangles[i][6], triangles[i][7],triangles[i][8]);
    triangle(triangles[i][0],triangles[i][1],triangles[i][2],triangles[i][3],triangles[i][4],triangles[i][5]);
  }
  drawDebugElements();
  drawLabels();

}

function mouseClicked(){
  if(autoGenerate) {
    return;
  }
  if(numOfClicks % 3== 0 ){
    oldPointA = pointA.slice();

    pointA[0] = mouseX > drawWidth ? drawWidth : mouseX;
    pointA[1] = mouseY > height ? height : mouseY;


  }else if(numOfClicks % 3 == 1){
    oldPointB = pointB.slice();

    pointB[0] = mouseX > drawWidth ? drawWidth : mouseX;
    pointB[1] = mouseY > height ? height : mouseY;
  

  }else if((numOfClicks % 3 == 2)){
    oldPointC = pointC.slice();

    pointC[0] = mouseX > drawWidth ? drawWidth : mouseX;
    pointC[1] = mouseY > height ? height : mouseY;

   currentColor[0] = random(0,255);
   currentColor[1] = random(0,255);
   currentColor[2] = random(0,255); 
  }
  numOfClicks++
}

function generateTriangle(x1, y1, x2, y2, x3, y3, r, g, b){
  triangles.push([x1, y1, x2, y2, x3, y3, r, g, b]);
  oldPointA = pointA.slice();
  oldPointB = pointB.slice();
  oldPointC = pointC.slice();
}

async function autoGenerateTriangles(){
  //clear();
  drawDebugElements();
  numOfClicks = -1;
  autoGenerate = !autoGenerate;

  if(autoGenerate){
    document.getElementById("auto_button").innerHTML = "Stop Generating Triangles";
    showSlider(true);
    
  }else{
    document.getElementById("auto_button").innerHTML = "Auto Gerate Triangles";
    showSlider(false);
  }

  while(autoGenerate){
    promise = await new Promise(resolve => setTimeout(resolve, baseGenerationInterval - slider.value()));
    console.log("Generating triangle...");
    if(autoGenerate){
      generateTriangle(random(0, drawWidth), random(0,height),random(0, drawWidth), random(0,height),random(0, drawWidth), random(0,height),random(0,255),random(0,255),random(0,255));
    }
  }
    
}

function drawDebugElements(){
  if(toggleDebug){
    fill(200);

  let textSpacing = 20;
  text (`Point A: ${pointA}`, 10, textSpacing)
  text (`Old Point A: ${oldPointA}`, 10, textSpacing * 2)
  text (`Point B: ${pointB}`, 10, textSpacing* 3)
  text (`Old Point B: ${oldPointB}`, 10, textSpacing * 4)
  text (`Point C: ${pointC}`, 10, textSpacing* 5)
  text (`Old Point C: ${oldPointC}`, 10, textSpacing * 6)
  text (`Num Of Clicks: ${numOfClicks}`, 10, textSpacing * 7)
  text (`Auto-generate: ${autoGenerate}`, 10, textSpacing * 8)
  text (`Debug mode: ${toggleDebug}`, 10, textSpacing * 9)
  }
  
}

function toggleDebugFunc(){
  toggleDebug = !toggleDebug;
  numOfClicks = -1;;
}

function clearTriangles(){
  triangles = [];
  numOfClicks = -1;;
}

function showSlider(needToShow){
  if(needToShow && sliderList.length == 0){
    slider.show();
    
  }
  if(!needToShow){
    console.log("Deleting Slider...");
    slider.hide()
  }
}

function drawLabels(){
  if(autoGenerate){
    fill(255);
    text("Triangle Generation Speed", drawWidth + 10, 50); // Triangle Speed Slider label
    let triangleSpeed = 1/(baseGenerationInterval - slider.value()) * 1000;
    text(`${triangleSpeed.toFixed(2)} Triangles/s`, drawWidth + 180, 25);
  }
}