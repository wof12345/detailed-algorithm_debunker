function addeventlistener(element, event, func) {
  element.addEventListener(`${event}`, func);
}

function numberify(collection) {
  collection = collection.map((x) => {
    return parseInt(x, 10);
  });
  return collection;
}

function trackMouse(e) {
  let posX = e.clientX;
  let posY = e.clientY;
  let currentSize = [window.innerWidth, window.innerHeight];
  setPosition(
    additionalVars.mouseTracker,
    posX + 6 > currentSize[0] - 50 ? posX - 60 : posX + 6,
    posY - 21 <= 21 ? posY : posY - 21
  );
  additionalVars.mouseX.textContent = posX;
  additionalVars.mouseY.textContent = posY;
}

function clickEvents(e) {
  let target = e.target;
  let targetClasses = target.className;
  additionalVars.selectedElem = target;

  if (targetClasses.includes("start_sim")) {
    startBtnProcess();
  }

  if (targetClasses.includes("next_step") && algorithmSimData.animationDone) {
    algorithmSimData.animationDone = false;
    stageCallHandler("next");
  }

  if (targetClasses.includes("prev_step") && algorithmSimData.animationDone) {
    algorithmSimData.animationDone = false;
    stageCallHandler("prev");
  }

  if (targetClasses.includes("auto_step_btn")) {
    autoplay("start");
  }

  if (targetClasses.includes("stop_step")) {
    autoplay("stop");
  }

  if (targetClasses.includes("dragging")) {
    target.classList.remove(".dragging");
    additionalVars.selectedElem = "";
  }

  if (targetClasses.includes("arrow")) {
    toggleStageDetails(pageLogics.stageDetailsOn);
  }
}

function dragEvents(e) {
  let target = additionalVars.selectedElem;
  let targetClass = target.className;

  if (targetClass?.includes("draggable")) {
    target.classList.add(".dragging");
    setPosition(target, e.clientX - 180, e.clientY - 10);
  }
}

function setUndefinedVariables() {
  pageElementsPredefinedPosition.simulation = getPosition(
    GETDOMQUERY(".simulation"),
    0,
    0
  );
  pageElementsPredefinedPosition.simulationSec = getPosition(
    GETDOMQUERY(".simulation_sec"),
    pageElementsPredefinedPosition.simulation[0],
    pageElementsPredefinedPosition.simulation[1]
  );
}

function setPosition(elm, posX, posY) {
  APPLYSTYLES([elm], [`transform: translate(${posX}px,${posY}px);`]);
}

function getPosition(elm, xOffset, yOffset) {
  let pageElm = elm;
  let xpos = pageElm.offsetLeft + xOffset;
  let ypos = pageElm.offsetTop + yOffset;
  return [xpos, ypos];
}

function setlastIlluminated(elements) {
  elements.forEach((element) => {
    additionalVars.lastilluminated.push(element);
  });
}

function getAndProcessInput() {
  let input = pageElements.simulationInput.value;
  let processedInput = input.split(/[ ,]+/);
  algorithmSimData.currentAlgorithmInputData = processedInput;
  generateSimObj(processedInput);
}

function generateSimObj(objItems) {
  let generatedHtmlSim = "";
  for (let i = 0; i < objItems.length; i++) {
    generatedHtmlSim += simObjGen(i, objItems[i], i);
  }
  pageElements.simulationCont.innerHTML = generatedHtmlSim;
}

function generateStages(stages) {
  let generatedHtmlTrack = "";
  let generatedStages = "";
  for (let i = 0; i < stages.length; i++) {
    generatedHtmlTrack += simStageTrack(i + 1);
    generatedStages += simStageDetails(i + 1);
  }
  pageElements.simulationStageTrack.innerHTML = generatedHtmlTrack;
  pageElements.stageDetailsCont.innerHTML = generatedStages;
}

function controlAlgorithmSimStage(commandData, stage) {
  let command = commandData[0];
  if (command === "swap") {
    animationSwapSquence(commandData, stage);
  } else if (command === "noswap") {
    animationNoSwapSquence(commandData, stage);
  }
}

function toggleStageDetails(logic) {
  pageLogics.stageDetailsOn = !logic;
  pageElements.stageDetailsContCont.classList.toggle("stage_visible");
  additionalVars.arrowShape.classList.toggle("arrow_flip");
}
