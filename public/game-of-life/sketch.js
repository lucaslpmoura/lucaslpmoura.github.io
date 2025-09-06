let width = 1280;
let height = 720;

var gridSize = 21;
var cellSize = height/gridSize;

var cells = [];

var simulationButton = document.getElementById("simulation_button");
var simulationRunning = false;
var intervalId = 0;

var autoMode = true;

var backgroundColor = [0,0,0]// #181818
var accentColor = [124,124,124,200]

class Cell {
  constructor(size, coord){
    this.size = size;
    this.coord = coord;
    this.state = false;
  }

  toggleState(){
    this.state = !this.state
    //console.log("Toggling cell at " + this.coord)
  }
}

function createCells(){
  cellSize = height/gridSize;
  cells = [];
  for(let i = 0; i < gridSize; i++){
    let line = [];
    for(let j = 0; j < gridSize; j++){
      line.push(new Cell(cellSize, [i,j]))
    }
    cells.push(line);
  }
}

function drawAllCells(cells){
  let animationSteps = 10;
  while(animationSteps >= 0){
    let scalingFactor = 11 % animationSteps;
    console.log(animationSteps);
    for(let i = 0; i < gridSize; i++){
      for(let j = 0; j < gridSize; j++){
        drawCell(cells[i][j], scalingFactor)
      }
    }
    animationSteps--;
  }
}

function drawCell(cell, factor){

  if(cell.state){
    fill(accentColor[0], accentColor[1], accentColor[2], accentColor[3]);
  }else{
    fill(backgroundColor[0], backgroundColor[1], backgroundColor[2]);
  }

  let relativeSize = (factor * 0.1) * cellSize;
  let xPos = (cell.coord[0] * cellSize) + (cellSize - relativeSize);
  let yPos = (cell.coord[1] * cellSize) + (cellSize - relativeSize);
  renderCell(xPos, yPos, relativeSize, 4);
  
}

function renderCell(xPos, yPos, size, radius){
  noStroke();
  rect(xPos, yPos, size, size, radius);
}


function setup() {
  height = windowHeight;
  createCanvas(windowHeight, windowHeight);
  createCells();
  
if (autoMode == true){
  autoSimulation();
}

}

function draw() {

  background(backgroundColor[0], backgroundColor[1], backgroundColor[2]);
  frameRate(2);
  drawAllCells(cells);
}

function mouseClicked(){
  if(!autoMode){
    xPos =  Math.trunc(mouseX/cellSize);
    yPos = Math.trunc(mouseY /cellSize)
  
    try{
      cells[xPos][yPos].toggleState(); 
    }catch{
  
    }
  }
 
 
}

function windowResized() {
  resizeCanvas(windowHeight, windowHeight); 
  createCells();
}


function startSimulation(){
  simulationRunning = true;
  intervalId = setInterval(() => {
    simulate();
  }, 1000)
}

function stopSimulation(){
  simulationRunning = false;
  clearInterval(intervalId);
}

function toggleSimulation(){
  if(!simulationRunning){
    simulationRunning = true;
    startSimulation();

  }else{
    simulationRunning = false;
    stopSimulation();
    
  }
}

function autoSimulation(){
  createCells();
  pickStarterCells();
  startSimulation();
}

function restartAutoSimulation(){
  stopSimulation();
  autoSimulation();
}

function pickStarterCells(){
  var patterns = [];
  
  patterns.push([
    [7,7], [6,8], [5,9],[5,10], [5,11], [6,12], [7,13], [8,14], [9,15],
    [12,7], [13,8], [14,9],[14,10], [14,11], [13,12], [12,13], [11,14], [10,15],
    [8,7], [11,7], [10,8], [9,8]
  ]);// Heart Pattern

  patterns.push([
    [6,7], [6,8], [6,9],[6,10], [6,11], [6,12], [6,13],
    [13,7], [13,8], [13,9],[13,10], [13,11], [13,12], [13,13]
  ]); // 2 Vertical Lines
 
  patterns.push([[10,10], [11,10], [10,12], [10,11]]); // Simple L (Tetris)

  patterns.push(
  [[1,9], [1, 10], [1, 11], [4,9], [4, 10], [4, 11], 
    [7,9], [7, 10], [7, 11], [10,9], [10, 10], [10, 11],
    [13,9], [13, 10], [13, 11], [16,9], [16, 10], [16, 11], [19,9], [19, 10], [19, 11]]
  ) // Dont remember what that is
    

  
  var borderPattern = [];
  for(let i = 0; i < gridSize; i++){
    borderPattern.push([0,i]);
    borderPattern.push([i,0]);
    borderPattern.push([(gridSize-1), i]);
    borderPattern.push([i, (gridSize -1)]);
  }
  patterns.push(borderPattern);

  var diagonalPattern = [];
  for(let i = 0; i < gridSize; i++){
    diagonalPattern.push([i,i]);
  }
  patterns.push(diagonalPattern);


  var trianglePattern = [];
  var checkerBoardPattern = [];
  for(let i = 0; i < gridSize; i++){
    for(let j = 0; j < gridSize; j++){
      if( (i+j) % 2 == 0){
        checkerBoardPattern.push([i,j]);
      }
      if((i+j) < gridSize/2){
        trianglePattern.push([i,j]);
      }
    }
  }
  //patterns.push(checkerBoardPattern);
  //patterns.push(trianglePattern);
  var pattern = patterns[getRandomInt(patterns.length)];
  for(let i = 0; i < pattern.length; i++){
    let cell = pattern[i];
    cells[cell[0]][cell[1]].state = true;
  }
}

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

// Simulates one generation of the game of life
function simulate(){  
  let cellsToToggleState = [];
  for(let i = 0; i < gridSize; i++){
    for(let j = 0; j < gridSize; j++){
      let cell = cells[i][j];
      let numOfAliveNeighbours = 0;
      // A lot of try-catchs to cover the cases where neighbours dont exist. Lazy solution.
      try{
        if(cells[i-1][j-1].state == true){
          numOfAliveNeighbours += 1;
        }
      }catch{}
      try{
        if(cells[i-1][j].state == true){
          numOfAliveNeighbours += 1;
        }
      }catch{}
      try{
        if(cells[i-1][j+1].state == true){
          numOfAliveNeighbours += 1;
        }
      }catch{}
      try{
        if(cells[i][j-1].state == true){
          numOfAliveNeighbours += 1;
        }
      }catch{}
      try{
        if(cells[i][j+1].state == true){
          numOfAliveNeighbours += 1;
        }
      }catch{}
      try{
        if(cells[i+1][j-1].state == true){
          numOfAliveNeighbours += 1;
        }
      }catch{}
      try{
        if(cells[i+1][j].state == true){
          numOfAliveNeighbours += 1;
        }
      }catch{
        
      }
      try{
        if(cells[i+1][j+1].state == true){
          numOfAliveNeighbours += 1;
        }
      }catch{}

      if(cell.state == true){
        if((numOfAliveNeighbours < 2) || (numOfAliveNeighbours > 3)){
          cellsToToggleState.push(cell);
        }
      }
      if(cell.state == false){
        if(numOfAliveNeighbours == 3){
          cellsToToggleState.push(cell);
        }
      }

    }
  }

  // If there are no new alive cells, stops the simulation.
  if(cellsToToggleState.length == 0){
    stopSimulation();
    if(autoMode){
      autoSimulation();
    }
  }
  for(let i = 0; i< cellsToToggleState.length; i++){
    cellsToToggleState[i].toggleState();
  }
}


function sleep(millisecondsDuration)
{
  return new Promise((resolve) => {
    setTimeout(resolve, millisecondsDuration);
  })
}