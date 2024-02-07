const gameContainer = document.getElementById("game");
const startButton = document.getElementById("startbtn");
const restartBtn = document.getElementById("restartbtn");
const scoreDisplay = document.getElementById("score");
const scoreContainer = document.getElementById("score-container")
const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "yellow",
  "yellow"
];
let score = 0;
let cardsFlipped = [];


restartBtn.addEventListener("click",restartGame);
// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

// when the DOM loads
//function createDivsForColors(colorArray){ //colorARRAY? //shuffled colors
//  for(let color of colorArray){ //colorarray?
//    const newCard = document.createElement("div");
//    newCard.classList.add("card",color);
//    gameContainer.appendChild(newCard);
//    newCard.addEventListener("click", handleCardClick);
//  }
//}


let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement("div");

    // give it a class attribute for the value we are looping over
    newDiv.classList.add(color);

    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}

// TODO: Implement this function!
function handleCardClick(event) {
  const cardClicked = event.target;
  if(cardClicked === cardsFlipped[0] || cardClicked.classList.contains("matched") ||
  cardsFlipped.length === 2){
    return;
  }
  cardClicked.classList.add("flipped");
  cardsFlipped.push(cardClicked);
  cardClicked.style.backgroundColor = cardClicked.classList[1]

  if(cardsFlipped.length ===2){
    const [card1, card2] = cardsFlipped;
  
  if(card1.classList[1]=== card2.classList[1]){
    card1.classList.add("matched");
    card2.classList.add("matched");
    cardsFlipped = [];
    card1.style.background
    score++;
    updateScore();
    checkMin();
  }else{
    setTimeout(() => {
      card1.classList.remove("flipped");
      card2.classList.remove("flipped");
      cardsFlipped = [];
      card1.style.backgroundColor = ""
      card2.style.backgroundColor = ""
    }, 1000);
  }
}
  // you can use event.target to see which element was clicked
  console.log("you just clicked", event.target);
}

// when the DOM loads
function createDivsForColors(colorArray){ //colorARRAY? //shuffled colors
  for(let color of colorArray){ //colorarray?
    const newDiv = document.createElement("div");
    newDiv.classList.add("card",color);
    //newDiv.style.backgroundColor = color
    gameContainer.appendChild(newDiv);
    newDiv.addEventListener("click", handleCardClick);
  }
}
function startGame(){
  gameContainer.innerHTML = "";
  const shuffledColors = shuffle(COLORS);
  createDivsForColors(shuffledColors);
  score = 0;
  updateScore();
  
  //startButton.disabled = true;
}

//startButton.addEventListener("click",startGame);

startButton.addEventListener("click",function(){
  //startGame()
  gameContainer.style.display = "flex";
  gameContainer.style.flexWrap = "wrap";
  scoreContainer.style.display = "block"
  startGame();
});

function restartGame(){
  gameContainer.innerHTML = "";
  const shuffledColors = shuffle(COLORS);
  createDivsForColors(shuffledColors);
  score = 0;
  updateScore();
}
function updateScore(){
  scoreDisplay.textContent = `score: ${score}`;
}
function checkMin(){
const cardsMatched = document.querySelectorAll(".matched");
if(cardsMatched.length === COLORS.length){
  setTimeout(()=>{
    alert("YOU WON!!");
    startButton.disabled = false;
  },500);
}
}
document.addEventListener("DOMContentLoaded",startGame);
