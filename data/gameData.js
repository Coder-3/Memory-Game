// How many cards to be drawn on the screen each level
window.cardsPerLevel = [4, 8, 12, 16, 20, 24, 28];

// Stores the contents of the instruction and time attack pages for easy modification.
paragraphAndHeadingTextContents = {
  "normalInstructions": {
    normalParagraphContent: "To win, flip the tiles until you find a repeated tile. Then, click on the initial tiles location. Locate each pair of tiles to win.",
    normalParagraphClass: "Instructions",
    normalHeadingContent: "Normal Mode Instructions",
    normalHeadingClass: "InstructionsHeading"
  },
  "timeAttackInstructions": {
    timeAttackParagraphContent: "To win, flip the tiles until you find a repeated tile. Then, click on the initial tiles location. Locate each pair of tiles before the time runs out to win",
    timeAttackParagraphClass: "Instructions",
    timeAttackHeadingContent: "Time Attack Mode Instructions",
    timeAttackHeadingClass: "InstructionsHeading"
  }
};

// Selects the desired object.
var paragraphTextAndClass = paragraphAndHeadingTextContents["normalInstructions"];
var headingTextAndClass = paragraphAndHeadingTextContents["timeAttackInstructions"];
// var aboutTextAndClass = paragraphAndHeadingTextContents["aboutPage"];

// Goes inside the object to extract desired information and makes it global.
window.paraText = paragraphTextAndClass.normalParagraphContent;
window.paraClass = paragraphTextAndClass.normalParagraphClass;
window.headText = paragraphTextAndClass.normalHeadingContent;
window.headClass = paragraphTextAndClass.normalHeadingClass;

window.timeAttackParaText = headingTextAndClass.timeAttackParagraphContent;
window.timeAttackParaClass = headingTextAndClass.timeAttackParagraphClass;
window.timeAttackHeadText = headingTextAndClass.timeAttackHeadingContent;
window.timeAttackHeadClass = headingTextAndClass.timeAttackHeadingClass;
