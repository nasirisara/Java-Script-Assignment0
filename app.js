/*   This is the base file for the Sokoban assignment - include this one in your HTML page, before you add the main script file*/

/*   Enum of CSS Classes for the static elements   */
var Tiles = {
  Wall: "tile-wall",
  Space: "tile-space",
  Goal: "tile-goal"
};

/*   Enum of CSS Classes for the moving elements   */
var Entities = {
  Character: "entity-player",
  Block: "entity-block",
  BlockDone: "entity-block-goal"
};

/*  Legend
  W = Wall
  B = Movable block
  P = Player starting position
  G = Goal area for the blocks
*/
var tileMap01 = {
  width: 19,
  height: 16,
  mapGrid: [
      [[' '], [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' ']],
      [[' '], [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' ']],
      [[' '], [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' ']],
      [[' '], [' '], [' '], [' '], ['W'], ['W'], ['W'], ['W'], ['W'], [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' ']],
      [[' '], [' '], [' '], [' '], ['W'], [' '], [' '], [' '], ['W'], [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' ']],
      [[' '], [' '], [' '], [' '], ['W'], ['B'], [' '], [' '], ['W'], [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' ']],
      [[' '], [' '], ['W'], ['W'], ['W'], [' '], [' '], ['B'], ['W'], ['W'], [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' ']],
      [[' '], [' '], ['W'], [' '], [' '], ['B'], [' '], ['B'], [' '], ['W'], [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' ']],
      [['W'], ['W'], ['W'], [' '], ['W'], [' '], ['W'], ['W'], [' '], ['W'], [' '], [' '], [' '], ['W'], ['W'], ['W'], ['W'], ['W'], ['W']],
      [['W'], [' '], [' '], [' '], ['W'], [' '], ['W'], ['W'], [' '], ['W'], ['W'], ['W'], ['W'], ['W'], [' '], [' '], ['G'], ['G'], ['W']],
      [['W'], [' '], ['B'], [' '], [' '], ['B'], [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' '], ['G'], ['G'], ['W']],
      [['W'], ['W'], ['W'], ['W'], ['W'], [' '], ['W'], ['W'], ['W'], [' '], ['W'], ['P'], ['W'], ['W'], [' '], [' '], ['G'], ['G'], ['W']],
      [[' '], [' '], [' '], [' '], ['W'], [' '], [' '], [' '], [' '], [' '], ['W'], ['W'], ['W'], ['W'], ['W'], ['W'], ['W'], ['W'], ['W']],
      [[' '], [' '], [' '], [' '], ['W'], ['W'], ['W'], ['W'], ['W'], ['W'], ['W'], [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' ']],
      [[' '], [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' ']],
      [[' '], [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' ']]
  ]
};

//Listen to keydown
document.addEventListener("keydown", moveKeyPress);


//------------- Setting up the map ----------------------//

//Mapping the size and numbers
function Mapping(nr, size) {
  let mapString = "";
  for (let i = 0; i < nr; i++) {mapString += size + " ";}
  return mapString;
  
}
//Creating map and assigning "div"
function createMap() {
  let mContainer = document.createElement("div");
  let idCounter = 0;

  //Displaying the tiles
  mContainer.className = "map";
  
  mContainer.style.display = "inline-grid";
  mContainer.style.gridTemplateRows = Mapping(tileMap01.height, "2fr");
  mContainer.style.gridTemplateColumns = Mapping(tileMap01.width, "2fr");

  //Assing IDs
  tileMap01.mapGrid.forEach((tileArray) => {
    tileArray.forEach((tile) => {
      let element = document.createElement("div");
      element.classList.add("tile");
      element.id = ++idCounter;

      switch (tile[0]) {
        case " ": createSpace(element); break;
        case "W": createWall(element); break;
        case "P": createPlayer(element); break;
        case "B": createBlock(element); break;
        case "G": createGoal(element); break;
      }
      mContainer.appendChild(element);
    });

    document.body.appendChild(mContainer);
  });
}

//Classlist

function createSpace(element) {element.classList.add(Tiles.Space);}
function createWall(element) {element.classList.add(Tiles.Wall);}
function createPlayer(element) {element.classList.add(Entities.Character);playerTile = element;}
function createBlock(element) {element.classList.add(Entities.Block);}
function createGoal(element) {element.classList.add(Tiles.Goal);}


let playerTile;
let currentTile = Tiles.Space;


let playerPositionY = tileMap01.mapGrid.findIndex(array1 => array1.findIndex(array2 => 
  array2[0] == "P") != -1);
let playerPositionX = tileMap01.mapGrid[playerPositionY].findIndex(array1 => 
  array1[0] == "P");


let nrOfGoals = tileMap01.mapGrid.flat(2).filter(tile => tile == "G").length;
let Score = 5;


let nrOfSteps = 0;


function moveKeyPress(event){

  playerMovement = event.key;

  switch(event.key){
    case "ArrowUp":
        event.preventDefault();
        movePlayer(playerPositionX, playerPositionY - 1); 
    break;
    case "ArrowRight":
        event.preventDefault();
        movePlayer(playerPositionX + 1, playerPositionY); 
    break;
    case "ArrowDown":
        event.preventDefault();
        movePlayer(playerPositionX, playerPositionY + 1); 
    break;
    case "ArrowLeft":
        event.preventDefault();
        movePlayer(playerPositionX - 1, playerPositionY);
    break;
  }

}

function getTile(y, x){
  return tileMap01.mapGrid[y][x][0];
}


function getType(type){
  switch(type){
    case " ": return Tiles.Space;
    case "W": return Tiles.Wall;
    case "P": return Entities.Character;
    case "B": return Entities.Block;
    case "G": return Tiles.Goal;
  }
}

function getTileObject(x, y){
  let id = Number(y * tileMap01.width + x + 1);
  return { Tile: document.getElementById(id), X: x, Y: y};
}



function movePlayer(x, y){

  let tile = getTileObject(x, y);

  if(movePlayerTile(playerTile, tile)){
    playerPositionX = tile.X;
    playerPositionY = tile.Y;
    nrOfSteps++;
  }

}

function movePlayerTile(player, nextTile){

  if(nextTile.Tile.classList.contains(Tiles.Space)){
  
      nextTile.Tile.classList.replace(Tiles.Space, Entities.Character);
      player.classList.replace(Entities.Character, currentTile); 
    
      currentTile = Tiles.Space;
      playerTile = nextTile.Tile;

      return true;
  }else if(nextTile.Tile.classList.contains(Tiles.Goal)){
  
      nextTile.Tile.classList.replace(Tiles.Goal, Entities.Character);
      player.classList.replace(Entities.Character, currentTile); 
      playerTile = nextTile.Tile;

      currentTile = Tiles.Goal;

    return true;
  }else if(nextTile.Tile.classList.contains(Entities.Block)){
    return moveBlock(nextTile, player);
  }

  return false;
}

function moveBlock(blockTile,player){
  let nextTile;
  
  switch(playerMovement){
    case "ArrowUp": nextTile = getTileObject(blockTile.X, blockTile.Y - 1); break;
    case "ArrowDown": nextTile = getTileObject(blockTile.X, blockTile.Y + 1); break;
    case "ArrowLeft": nextTile = getTileObject(blockTile.X - 1, blockTile.Y); break;
    case "ArrowRight": nextTile = getTileObject(blockTile.X + 1, blockTile.Y); break;
  }

  let blockCurrentTile = getType(getTile(blockTile.Y, blockTile.X));

  if(blockCurrentTile == Entities.Block){blockCurrentTile = Tiles.Space;}
  
  if(nextTile.Tile.classList.contains(Tiles.Space)){
    
    if(blockCurrentTile == Tiles.Goal){
      blockTile.Tile.classList.replace(Entities.BlockDone, Entities.Character);
      blockTile.Tile.classList.replace(Entities.Block, Entities.Character);
      Score--;
    }else{
      blockTile.Tile.classList.replace(Entities.Block, Entities.Character);
    }

    nextTile.Tile.classList.replace(Tiles.Space, Entities.Block);
    player.classList.replace(Entities.Character, currentTile);

    currentTile = blockCurrentTile;
    playerTile = blockTile.Tile;

    return true;
  }else if(nextTile.Tile.classList.contains(Tiles.Goal)){

    blockTile.Tile.classList.replace(Entities.Block, Entities.Character);
    blockTile.Tile.classList.remove(Entities.BlockDone);

    nextTile.Tile.classList.replace(Tiles.Goal, Entities.BlockDone);
    nextTile.Tile.classList.add(Entities.Block);

    player.classList.replace(Entities.Character, currentTile);

    currentTile = blockCurrentTile;
    playerTile = blockTile.Tile;

    if(blockCurrentTile == Tiles.Space){
      Score++;
    }
    return true;
  }
  return false;
}











