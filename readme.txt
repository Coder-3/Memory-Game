Student Name: Antoine Stephan Cedric Quenette
SID: 218043304


App Title: Memory Game

Overview:
My app is a memory game where the user will be able to select a category and
get tiles based on that category. The tiles would be covered and flip to
reveal the image when clicked. Each tile has its identical pair, when that pair
is found, the user must click the location of the other pair to get 5 points and
keep both tiles flipped. When all the tiles are flipped, the level increments, adding
more cards to the screen, this repeats until 30 cards are drawn.
There is also a time attack gamemode where the user would be trying to complete the
level before the timer runs out.
In terms of the design, the app has hover animations for the buttons and play a sound
onclick.
In addition, the background is animated and the animation is persistent throughout
all game pages, giving a consistent feel to the game.


Major functions:
app.js:

window.instructionsPage = function(selection)
Purpose:
  Clears the body, creates a div where if case 1 is selected, a heading
  containing the normal instructions will be contained as well as the normal
  instructions paragraph. If case 2 is selected, the time attack mode heading
  and instructions will be appeneded
 Params:
  selection - the number to be used in the switch statement to decide which case
  to use.

gameModePage = function()
Purpose:
  Clears the body and creates buttons of each game category, onclick, call the changeUrl();
  function and pass the new path of the relevant category in it. Calls playSound();
  and pass the path of the sound effect to be played onclick and whether we want
  it to loop or not.
  There is also a home button added which runs createMenu(); and calls playSound();
  which is passed the path for the desired sound effect.

createLevel = function(imageSource, dataAttribute)
 Purpose:
  Creates a div and two image elements which are then added the specified
  classes. The div is set the dataset as a parameter. The div is also assigned
  a default isFlipped ataset value of false. Then, the front face is passed a
  path to the desired image as a parameter. The back face has the default
  owl svg logo. Then, both the front and back face are appended to the div. The
  div is then made a global variable to be appended to the section in
  createSection();.
 Params:
  - imageSource: The partial path to the images to be used in-game.
  - dataAttribute: The dataset to be assigned to the card.

drawProgressBar = function()
 Purpose:
  If progressBar global variable is true, create two divs, one appended
  to the other and then appended to the body. Then set the width of the bar
  element, then if the current with is less than the specified maximum, increase
  the width of the bar element. If it is greater or equal to the specified width,
  clear the intervqal and call endGame();.

createSection = function(url)
Purpose:
  Clears the body, Initialises numberOfMatches to 0, checks whether
  the currentlyPlaying global variable is false, if it is, it will play the game
  music on repeat and set the global variable to true. Then calls the
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

endGame = function()
Purpose:
  Clears the body, creates a div which contains a two paragrapghs and
  a heading one and appends them to body.

function loadApp()
Purpose:
  List of functions to load on window load

window.onload = loadApp;
Purpose:
  Load this function on window load

utils.js

window.changeUrl = function(newUrl)
Purpose:
  Clears the document body, changes window.url to newUrl and passes
  that new url as a parameter in the createSection(); function.
Params:
  newUrl - url to be assigned to window.url global variable.

window.nextLevel = function()
Purpose:
  Clears the document body, increments the currentLevel global variable
  by one and passes the contents of the url global variable to the
  createSection(); function.

window.previousLevel = function()
Purpose:
  Clears the document body, decrements the currentLevel global variable
  by one and passes the contents of the url global variable to the
  createSection(); function.

window.playSound = function(source, loop)
Purpose:
  Creates a sound element, gives it a source, plays the sound and loops
  it if the loop global variable is true.

Params:
  source - path to the sound to be played.
  loop - bool global variable which indicates whether sound effect will loop
  or not.

window.flipCard = function()
Purpose:
  Flips the card when it is clicked and adds to it the class 'flip'.
  If the card has not been flipped previously, make indicate that it has
  been flipped now.
  Runs checkForMatch(); function.

window.checkForMatch = function()
Purpose:
  Checks whether the first card which is flipped has the same
  dataset as the second card which has been flipped; store this as a bool in
  the isMatch variable.
  If it is true, run disableCards();, increment the
  scoreCounter and numberOfMatches global variables by one and update the score
  paragraph element with the new value of scoreCounter.
  If it is false, run unflipCards();, decrement the score counter global
  variable by one and update the score paragraph element with the new value of
  scoreCounter.

window.disableCards = function()
Purpose:
  This runs if the first and second cards match. It removes the event
  listeners from the cards preventing them from calling flipCard();.
  Then runs resetBoard();.

window.unflipCards = function()
Purpose:
  This runs if the first and second cards do not match, it sets the
  lockBoard global variable to true then removes the flip class from the first
  and second cards and then runs resetBoard();. All of this after 1500ms.

window.resetBoard = function()
Purpose:
  Resets the global variables to their original values.

const cards = document.querySelectorAll('.memory-card');
Purpose:
  Adds a query selector to all the cards called memory-card.

cards.forEach(card => card.addEventListener('click', flipCard));
Purpose:
  Adds event listener 'click' to each card allowing them to run
  flipCard(); when clicked.

ui.js

window.createP = function(paragraphText, paragraphClass)
Purpose:
  Creates a paragraph element, creates text node, appends text node to paragraph
  element.
Params:
  paragraphText - the text to be contained within the paragraph.
  paragraphClass - the class of the paragraph element.
Returns:
  paragraph element.

window.createHeading1 = function(titleText, headingOneClass)
Purpose:
  Creates a heading one element, creates text node, appends text node
  to heading one element.
Params:
  titleText - the text to be contained within the heading one element.
  headingOneClass - the class of the heading one element.
Returns:
  heading one element.

window.createButton = function(buttonText, buttonClass)
Purpose:
  Creates a button element, creates text node, appends text node
  to button element.
Params:
  buttonText - the text to be contained within the button element.
  buttonClass - the class of the button element.
Returns:
  button element.

window.createMenu = function()
Purpose:
  Clears the body, resets the global variables to their default values,
  creates a button to allow the user to play the normal game mode and another
  button to allow the user to play the time attack game mode.

gameData.js

window.cardsPerLevel
Purpose:
  How many cards to be drawn on the screen each level

paragraphAndHeadingTextContents = {};
Purpose:
  Stores the contents of the instruction and time attack pages for easy modification.

var ___TextAndClass = ___TextContents[];
Purpose:
  Selects the desired object.

window.___Text = ___TextAndClass.normal___Content;
window.___Class = ___TextAndClass.normal___Class;
window.timeAttack___Text = ___TextAndClass.timeAttack___Content;
window.timeAttack___Class = ___TextAndClass.timeAttack___Class;
Purpose:
  Goes inside the object to extract desired information and makes it global.
