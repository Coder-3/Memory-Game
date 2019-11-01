/*
  Purpose: Clears the document body, changes window.url to newUrl and passes
  that new url as a parameter in the createSection(); function.

  Params:
  newUrl - url to be assigned to window.url global variable.
*/
window.changeUrl = function(newUrl) {
  document.body.innerHTML = "";

  window.url = newUrl;
  createSection(newUrl);
}

/*
  Purpose: Clears the document body, increments the currentLevel global variable
  by one and passes the contents of the url global variable to the
  createSection(); function.
*/
window.nextLevel = function() {
  document.body.innerHTML = "";

  window.currentLevel++;
  createSection(url);
}

/*
  Purpose: Clears the document body, decrements the currentLevel global variable
  by one and passes the contents of the url global variable to the
  createSection(); function.
*/
window.previousLevel = function() {
  document.body.innerHTML = "";

  window.currentLevel--;
  createSection(url);
}

/*
  Purpose: Creates a sound element, gives it a source, plays the sound and loops
  it if the loop global variable is true.

  Params:
  source - path to the sound to be played.
  loop - bool global variable which indicates whether sound effect will loop
  or not.
*/
window.playSound = function(source, loop) {
  var audioElement = document.createElement('audio');
  audioElement.setAttribute('src', source);
  audioElement.play();
  audioElement.loop = loop;
}

/*
  Purpose: Flips the card when it is clicked and adds to it the class 'flip'.
  If the card has not been flipped previously, make indicate that it has
  been flipped now.
  Runs checkForMatch(); function.
*/
window.flipCard = function() {
  if(lockBoard) return;
  if(this === firstCard) ;

  this.classList.add("flip");

  if(!hasFlippedCard) {
    hasFlippedCard = true;
    firstCard = this;
    firstCard.dataset.isFlipped = true;
    return;
  }

  secondCard = this;

  checkForMatch();
}

/*
  Purpose: Checks whether the first card which is flipped has the same
  dataset as the second card which has been flipped; store this as a bool in
  the isMatch variable.
  If it is true, run disableCards();, increment the
  scoreCounter and numberOfMatches global variables by one and update the score
  paragraph element with the new value of scoreCounter.
  If it is false, run unflipCards();, decrement the score counter global
  variable by one and update the score paragraph element with the new value of
  scoreCounter.
*/
window.checkForMatch = function() {
  let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;

  if(isMatch) {
    disableCards();
    window.scoreCounter = window.scoreCounter + 5;
    window.numberOfMatches++;
    document.getElementsByClassName("scoreCounter")[0].innerHTML = "Score: " + scoreCounter;
  }
  else {
    unflipCards();
    window.scoreCounter--;
    document.getElementsByClassName("scoreCounter")[0].innerHTML = "Score: " + scoreCounter;
  }

  if(numberOfMatches == cardsPerLevel[currentLevel] / 2) {
    setTimeout(nextLevel, 1500);
  }
}

/*
  Purpose: This runs if the first and second cards match. It removes the event
  listeners from the cards preventing them from calling flipCard();.
  Then runs resetBoard();.
*/
window.disableCards = function() {
  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);

  resetBoard();
}

/*
  Purpose: This runs if the first and second cards do not match, it sets the
  lockBoard global variable to true then removes the flip class from the first
  and second cards and then runs resetBoard();. All of this after 1500ms.
*/
window.unflipCards = function() {
  lockBoard = true;

  setTimeout(() => {
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');

    resetBoard();
  }, 1500);
}

/*
  Purpose: Resets the global variables to their original values.
*/
window.resetBoard = function() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

/*
  Purpose: Adds a query selector to all the cards called memory-card.
*/
const cards = document.querySelectorAll('.memory-card');

/*
  Purpose: Adds event listener 'click' to each card allowing them to run
  flipCard(); when clicked.
*/
cards.forEach(card => card.addEventListener('click', flipCard));
