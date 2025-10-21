let soundFiles = [
  "4-5.mp3",
  "2-1.mp3",
  "2-2.mp3",
  "2-3.mp3",
  "2-4.mp3",
  "2-5.mp3",
  "3-1.mp3",
  "3-2.mp3",
  "3-3.mp3",
  "3-4.mp3",
  "3-5.mp3",
  "4-1.mp3",
  "4-2.mp3",
  "4-3.mp3",
  "4-4.mp3"
];

let sounds = [];
let currentSound;
let lastSoundIndex = -1;
let questionButton, revealButton, nextButton;
let answerVisible = false;
let fileName = "";

function preload() {
  for (let i = 0; i < soundFiles.length; i++) {
    sounds[i] = loadSound("assets/" + soundFiles[i]);
  }
}

function setup() {
  noCanvas();

  createElement("h1", "Polyphonic Voices Quiz").style("text-align", "center");
  createElement("h3", "Identify the Number of Voices").style("text-align", "center");

  let container = createDiv().style("display", "flex").style("flex-direction", "column")
    .style("align-items", "center").style("gap", "20px").style("margin-top", "30px");

  // QUESTION row
  let questionRow = createDiv().style("display", "flex").style("align-items", "center").style("gap", "20px");
  questionRow.parent(container);
  createSpan("QUESTION").parent(questionRow).style("font-weight", "bold").style("font-size", "18px");

  questionButton = createButton("PLAY");
  questionButton.parent(questionRow);
  questionButton.style("background-color", "green").style("color", "white").style("padding", "10px 20px").style("border-radius", "8px").style("border", "none").style("cursor", "pointer");
  questionButton.mousePressed(toggleQuestionSound);

  // ANSWER row
  let answerRow = createDiv().style("display", "flex").style("align-items", "center").style("gap", "20px");
  answerRow.parent(container);
  createSpan("ANSWER").parent(answerRow).style("font-weight", "bold").style("font-size", "18px");

  revealButton = createButton("REVEAL");
  revealButton.parent(answerRow);
  revealButton.style("background-color", "blue").style("color", "white").style("padding", "10px 20px").style("border-radius", "8px").style("border", "none").style("cursor", "pointer");
  revealButton.mousePressed(revealAnswer);

  // ANSWER text
  answerText = createP("");
  answerText.parent(container);
  answerText.style("font-size", "16px").style("font-weight", "bold").style("text-align", "center");

  // NEXT QUESTION button
  nextButton = createButton("NEXT QUESTION");
  nextButton.parent(container);
  nextButton.style("background-color", "#555").style("color", "white").style("padding", "10px 25px").style("border-radius", "8px").style("border", "none").style("cursor", "pointer");
  nextButton.mousePressed(nextQuestion);

  nextQuestion();
}

function toggleQuestionSound() {
  if (currentSound && currentSound.isPlaying()) {
    currentSound.stop();
    questionButton.html("PLAY");
    questionButton.style("background-color", "green");
  } else {
    stopAllSounds();
    currentSound.play();
    questionButton.html("STOP");
    questionButton.style("background-color", "red");
  }
}

function revealAnswer() {
  answerVisible = true;
  answerText.html("Answer: " + fileName);
}

function nextQuestion() {
  stopAllSounds();
  questionButton.html("PLAY");
  questionButton.style("background-color", "green");
  answerText.html("");
  answerVisible = false;

  let newIndex;
  do {
    newIndex = floor(random(sounds.length));
  } while (newIndex === lastSoundIndex);
  lastSoundIndex = newIndex;

  currentSound = sounds[newIndex];

  // Determine answer based on file name
  let thisFile = soundFiles[newIndex];
  if (thisFile.startsWith("2-")) {
    fileName = "2 Voices";
  } else if (thisFile.startsWith("3-")) {
    fileName = "3 Voices";
  } else if (thisFile.startsWith("4-")) {
    fileName = "4 Voices";
  } else {
    fileName = "Unknown";
  }
}

function stopAllSounds() {
  for (let s of sounds) {
    if (s.isPlaying()) s.stop();
  }
}
