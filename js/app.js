// Contains the path to each categories image set.
window.url = 'images/landmarks/landmarks (';

/*
  Purpose: Clears the body, creates a div where if case 1 is selected, a heading
  containing the normal instructions will be contained as well as the normal
  instructions paragraph. If case 2 is selected, the time attack mode heading
  and instructions will be appeneded.

  Params:
  selection - the number to be used in the switch statement to decide which case
  to use.
*/
window.instructionPage = function(selection) {
  document.body.innerHTML = "";

  var headAndParaDiv = document.createElement("div");
  headAndParaDiv.classList.add("headAndParaDiv");
  document.body.appendChild(headAndParaDiv);

  switch(selection) {
    case 1:
      var instructionsHead = createHeading1(headText, headClass);
      headAndParaDiv.appendChild(instructionsHead);
      var instructionsPara = createP(paraText, paraClass);
      headAndParaDiv.appendChild(instructionsPara);
      progressBar = false;
      var categoryButton = createButton("Select Category", "buttonClassCategory");
      categoryButton.onclick = function() { gameModePage(); playSound("sounds/whoosh.wav", false); };
      document.body.appendChild(categoryButton);
      break;
    case 2:
      var instructionsHead = createHeading1(timeAttackHeadText, timeAttackHeadClass);
      headAndParaDiv.appendChild(instructionsHead);
      var instructionsPara = createP(timeAttackParaText, timeAttackParaClass);
      headAndParaDiv.appendChild(instructionsPara);
      progressBar = true;
      var categoryButton = createButton("Select Category", "buttonClassCategory");
      categoryButton.onclick = function() { gameModePage(); playSound("sounds/whoosh.wav", false); };
      document.body.appendChild(categoryButton);
      break;
  }
}

/*
  Purpose: Clears the body and creates buttons of each game category, onclick, call the changeUrl();
  function and pass the new path of the relevant category in it. Calls playSound();
  and pass the path of the sound effect to be played onclick and whether we want
  it to loop or not.
  There is also a home button added which runs createMenu(); and calls playSound();
  which is passed the path for the desired sound effect.
*/
gameModePage = function() {
  document.body.innerHTML = "";

  var gameModeDiv = document.createElement("div");
  gameModeDiv.classList.add("gameModeDiv");
  document.body.appendChild(gameModeDiv);

  var peopleButton = createButton('People', 'buttonClassMain');
  peopleButton.onclick = function() { changeUrl('images/people/people ('); playSound("sounds/whoosh.wav", false); };
  gameModeDiv.appendChild(peopleButton);

  var landmarksButton = createButton('Landmarks', 'buttonClassMain');
  landmarksButton.onclick = function() { changeUrl('images/landmarks/landmarks ('); playSound("sounds/whoosh.wav", false); };
  gameModeDiv.appendChild(landmarksButton);

  var holidaysButton = createButton('Holidays', 'buttonClassMain');
  holidaysButton.onclick = function() { changeUrl('images/holidays/holidays ('); playSound("sounds/whoosh.wav", false); };
  gameModeDiv.appendChild(holidaysButton);

  var datesButton = createButton('Date Night', 'buttonClassMain');
  datesButton.onclick = function() { changeUrl('images/dates/dates ('); playSound("sounds/whoosh.wav", false); };
  gameModeDiv.appendChild(datesButton);

  var oktoberfestButton = createButton('Oktoberfest', 'buttonClassMain');
  oktoberfestButton.onclick = function() { changeUrl('images/oktoberfest/oktoberfest ('); playSound("sounds/whoosh.wav", false); };
  gameModeDiv.appendChild(oktoberfestButton);

  var flagsButton = createButton('Flags', 'buttonClassMain');
  flagsButton.onclick = function() { changeUrl('images/flags/flags ('); playSound("sounds/whoosh.wav", false); };
  gameModeDiv.appendChild(flagsButton);

  var homeButton = createButton('Home', 'buttonHome');
  homeButton.onclick = function() { createMenu(); playSound("sounds/whoosh.wav", false); }
  gameModeDiv.appendChild(homeButton);
}

/*
  Purpose: Creates a div and two image elements which are then added the specified
  classes. The div is set the dataset as a parameter. The div is also assigned
  a default isFlipped ataset value of false. Then, the front face is passed a
  path to the desired image as a parameter. The back face has the default
  owl svg logo. Then, both the front and back face are appended to the div. The
  div is then made a global variable to be appended to the section in
  createSection();.

  Params:
  - imageSource: The partial path to the images to be used in-game.
  - dataAttribute: The dataset to be assigned to the card.
*/
createLevel = function(imageSource, dataAttribute) {
  var div = document.createElement("div");
  var imgOne = document.createElement("img");
  var imgTwo = document.createElement("img");

  div.classList.add('memory-card');
  imgOne.classList.add('front-face');
  imgTwo.classList.add('back-face');

  div.setAttribute('data-framework', dataAttribute);
  div.dataset.isFlipped = false;

  imgOne.src = imageSource;
  imgTwo.src = 'images/owl.svg';
  div.appendChild(imgOne);
  div.appendChild(imgTwo);

  window.div = div;
}

/*
  Purpose: If progressBar global variable is true, create two divs, one appended
  to the other and then appended to the body. Then set the width of the bar
  element, then if the current with is less than the specified maximum, increase
  the width of the bar element. If it is greater or equal to the specified width,
  clear the intervqal and call endGame();.
*/
drawProgressBar = function() {
  if(progressBar) {
    var outerBarDiv = document.createElement("div");
    var innerBarDiv = document.createElement("div");

    outerBarDiv.id = "myProgress";
    innerBarDiv.id = "myBar";

    document.body.appendChild(outerBarDiv);
    outerBarDiv.appendChild(innerBarDiv);

    var elem = document.getElementById("myBar");
    var width = 1;
    var timeRemaining = setInterval(frame, 1000);
    function frame() {
      if (width >= 50) {
          clearInterval(timeRemaining);
          endGame();
      } else {
          width++;
          elem.style.width = width + '%';
      }
    }
  }
}

/*
  Purpose: Clears the body, Initialises numberOfMatches to 0, calls the
  drawProgressBar(); function, then creates a section to which a class is added
  then, the section is appended to body.
  A for-loop is added to draw the cards. The cardCounter starts at 1 because the
  filenames start at 1. The loop continues while cardCounter is less than the
  number of cards this level / 2 + 1. This is because the loop creates two equal
  cards. In the loop, createLevel is called and the url global variable is passed
  as a parameter, concatenated with the value of cardCounter and ).svg. It is
  also passed cardCounter as its class.
  The global variable div from the createLevel function is the appended to the
  section and the div is assigned the function flipCard onclick. Then, to
  randomise the position os the cards, we assign randomPos a random value which
  is then set as the position of the div.
  This is repeated twice to create two equal cards so we can have pairs to match.

  Params:
  - url: global variable containing the partial path of the images.
*/
createSection = function(url) {
  document.body.innerHTML = "";

  // Number of times the firstCard === secondCard.
  window.numberOfMatches = 0;

  drawProgressBar();

  var section = document.createElement("section");
  section.classList.add("memory-game");
  document.body.appendChild(section);

  for(cardCounter = 1; cardCounter < cardsPerLevel[currentLevel] / 2 + 1; cardCounter++) {
    createLevel(url + cardCounter + ').svg', cardCounter);
    section.appendChild(div);
    div.onclick = flipCard;
    ramdomPos = Math.floor(Math.random() * 12);
    div.style.order = ramdomPos;

    createLevel(url + cardCounter + ').svg', cardCounter);
    section.appendChild(div);
    div.onclick = flipCard;
    ramdomPos = Math.floor(Math.random() * 12);
    div.style.order = ramdomPos;
  }

  var score = createP("Score: " + scoreCounter, 'scoreCounter');
  document.body.appendChild(score);

  var homeButton = createButton('Home', 'buttonHome');
  homeButton.onclick = function() { createMenu(); playSound("sounds/whoosh.wav", false); };
  document.body.appendChild(homeButton);

  var previousButton = createButton('Previous', 'buttonPrevious');
  previousButton.onclick = function() { previousLevel(); playSound("sounds/whoosh.wav", false); }
  document.body.appendChild(previousButton);
}

/*
  Purpose: Clears the body, creates a div which contains a two paragrapghs and
  a heading one and appends them to body.
*/
endGame = function() {
  console.log("endgamestarted");
  document.body.innerHTML = "";
  var gameOverDiv = document.createElement("div");
  gameOverDiv.classList.add("gameOverDiv");
  var gameOverHeading = createHeading1("Game Over!", "gameOver");
  var sorryParagraph = createP("Sorry, you ran out of time.", "timeUp");
  var finalScoreParagraph = createP("Your final score was " + scoreCounter, "timeUp");

  var homeButton = createButton('Home', 'buttonHome');
  homeButton.onclick = function() { createMenu(); playSound("sounds/whoosh.wav", false); };
  document.body.appendChild(homeButton);

  document.body.appendChild(gameOverDiv);
  gameOverDiv.appendChild(gameOverHeading);
  gameOverDiv.appendChild(sorryParagraph);
  gameOverDiv.appendChild(finalScoreParagraph);
}

// List of functions to load on window load
function loadApp() {
  createMenu();
}

// Load this function on window load
window.onload = loadApp;
