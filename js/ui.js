/*
  Purpose: Creates a paragraph element, creates text node, appends text node to paragraph
  element.

  Params:
  paragraphText - the text to be contained within the paragraph.
  paragraphClass - the class of the paragraph element.

  Returns: paragraph element.
*/
window.createP = function(paragraphText, paragraphClass) {
  console.log("createP(): Started...");
  var Paragraph = document.createElement("P");
  var textNode4 = document.createTextNode(paragraphText);
  Paragraph.appendChild(textNode4);
  Paragraph.classList.add(paragraphClass)

  return Paragraph;
  console.log("createP(): Ended...");
}

/*
  Purpose: Creates a heading one element, creates text node, appends text node
  to heading one element.

  Params:
  titleText - the text to be contained within the heading one element.
  headingOneClass - the class of the heading one element.

  Returns: heading one element.
*/
window.createHeading1 = function(titleText, headingOneClass) {
  console.log("CreateHeading1(): Started...");
  var Heading = document.createElement("H1");
  var textNode = document.createTextNode(titleText);
  Heading.appendChild(textNode);
  Heading.classList.add(headingOneClass);

  return Heading;
  console.log("CreateHeading1(): Ended...");
}

/*
  Purpose: Creates a button element, creates text node, appends text node
  to button element.

  Params:
  buttonText - the text to be contained within the button element.
  buttonClass - the class of the button element.

  Returns: button element.
*/
window.createButton = function(buttonText, buttonClass) {
  console.log("createButton() started");
  var button = document.createElement("button");
  var textNode = document.createTextNode(buttonText);
  button.classList.add(buttonClass);
  button.appendChild(textNode);

  console.log("createButton() ended");

  return button;
}

/*
  Purpose: Clears the body, resets the global variables to their default values,
  creates a button to allow the user to play the normal game mode and another
  button to allow the user to play the time attack game mode.
*/
window.createMenu = function() {
  document.body.innerHTML = "";

  // Whether the card has been flipped.
  window.hasFlippedCard = false;
  // Whether the board is locked, which prevents the flipping of cards when true.
  window.lockBoard = false;
  // Declare the cars variables.
  window.firstCard = 0;
  window.secondCard = 0;
  // Initialises the current level to 0.
  window.currentLevel = 0;
  // Initialises the current score to 0.
  window.scoreCounter = 0;

  var owlDiv = document.createElement("div");
  var logoImage = document.createElement("img");
  logoImage.src = "images/owl.png";
  logoImage.alt = "images/owl.png";
  logoImage.classList.add("owlLogo");
  owlDiv.classList.add("owlDiv");
  document.body.appendChild(owlDiv);
  owlDiv.appendChild(logoImage);

  var normalModeButton = createButton('Normal', 'buttonClassMenu');
  normalModeButton.onclick = function() { instructionPage(1); playSound("sounds/whoosh.wav", false); };
  document.body.appendChild(normalModeButton);

  var timeAttackModeButton = createButton('Time Attack', 'buttonClassMenu');
  timeAttackModeButton.onclick = function() { instructionPage(2); playSound("sounds/whoosh.wav", false); }
  document.body.appendChild(timeAttackModeButton);

  // var aboutPageButton = createButton('About', 'buttonHome');
  // aboutPageButton.onclick = function() { aboutPage(); playSound("sounds/whoosh.wav", false); }
  // document.body.appendChild(aboutPageButton);
}
