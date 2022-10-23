// Pick the number of sets based on selected minutes
function pickSets(minutes) {
  if (minutes==5) {
    setsTotal = 1;
  } else if (minutes==10) {
    // Choose sets based on a random number within a range
    setsTotal = Math.floor(Math.random() * (4 - 2) ) + 2;
  } else if (minutes==15) {
    setsTotal = Math.floor(Math.random() * (5 - 3) ) + 3;
  } else if (minutes==20) {
    setsTotal = Math.floor(Math.random() * (6 - 4) ) + 4;
  } else {
    setsTotal = Math.floor(Math.random() * (7 - 5) ) + 5;
  }
}

// Pick the exercises based on the selected type and pullup bar usability
function pickExercises(type) {
  if (type=="lower") {
    exerShuffle = legExercises.sort(() => 0.5 - Math.random());
  } else if (type=="core") {
    exerShuffle = coreExercises.sort(() => 0.5 - Math.random());
  } else if (type=="upper") {
    // Check if a pullup bar is usable
    if (barsOut==1) {
      upperExercises = pushExercises.concat(pullExercises);
      exerShuffle = upperExercises.sort(() => 0.5 - Math.random());
    } else {
      exerShuffle = pushExercises.sort(() => 0.5 - Math.random());
    }
  } else {
    // Shuffle each exercise deck
    fullShuffle = fullExercises.sort(() => 0.5 - Math.random());
    legShuffle = legExercises.sort(() => 0.5 - Math.random());
    coreShuffle = coreExercises.sort(() => 0.5 - Math.random());
    pushShuffle = pushExercises.sort(() => 0.5 - Math.random());
    // Pick one from each to form a whole body routine
    wholeExercises = [fullExercises[0], fullExercises[1], legShuffle[0], coreShuffle[0], pushShuffle[0]];
    if (barsOut==1) {
      pullShuffle = pullExercises.sort(() => 0.5 - Math.random());
      wholeExercises.push(pullShuffle[0]);
    }
    exerShuffle = wholeExercises.sort(() => 0.5 - Math.random());
  }
}

// Pick the number of exercises and rep ranges based on level
function pickLevel(level) {
  if (level=="beginner") {
    numExercises = 4
    minLoc = 1
    maxLoc = 2
  } else if (level=="intermediate") {
    numExercises = 4
    minLoc = 3
    maxLoc = 4
  } else {
    numExercises = 5
    minLoc = 5
    maxLoc = 6
  }
}

// Pick the reps based on exercise and level
function pickReps(total, exercises) {
  exerReps = [];
  i = 0;
  while (i < total) {
    minRep = exercises[i][minLoc];
    maxRep = exercises[i][maxLoc];
    exerReps.push(Math.floor(Math.random() * (maxRep - minRep) ) + minRep);
    i++;
  }
}

// Generate the written program based on sets, exercises, and reps
function buildProgram(sets, total, exercises, reps) {
  // Check if singular or plural
  if (sets > 1) {
    singularOrPlural = "sets"
  } else {
    singularOrPlural = "set"
  }
  bodyProgram = "Do " + sets + " " + singularOrPlural + " of:<br>";
  // Iterate through reps & exercises
  j = 0
  while (j < total) {
    bodyProgram += reps[j] + " " + exercises[j][0] + "<br>";
    j++;
  }
}

function buildWorkout() {
  pickSets(minutesOut);
  pickExercises(typesOut);
  pickLevel(levelsOut);
  pickReps(numExercises, exerShuffle);
  buildProgram(setsTotal, numExercises, exerShuffle, exerReps);
  // Print the program
  document.getElementById("program").innerHTML = bodyProgram;
}
