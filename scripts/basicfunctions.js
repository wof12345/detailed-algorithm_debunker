function addeventlistener(element, event, func) {
  element.addEventListener(`${event}`, func);
}

function numberify(collection) {
  collection = collection.map((x) => {
    return parseInt(x, 10);
  });
  return collection;
}

function updateMousePos(e) {
  globalMousePos.x = e.clientX - pageElements.simulationStageTrack.offsetLeft;
  globalMousePos.y = e.clientY - pageElements.simulationStageTrack.offsetTop;

  // console.log(globalMousePos);
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

function mouseMoveEvent(e) {
  let target = e.target;
  let targetClasses = target.className;

  death(targetClasses);
}

function clickEvents(e) {
  let target = e.target;
  let targetClasses = target.className;
  additionalVars.selectedElem = target;
  // console.log(additionalVars.selectedElem);

  if (targetClasses.includes("algorithm_item")) {
    initiateSimWindow(target.textContent);
  }

  if (targetClasses.includes("close_btn")) {
    eliminateSimWindow();
    autoplay("stop", additionalVars.controlStop);
  }

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
    autoplay("start", additionalVars.controlStart);
  }

  if (targetClasses.includes("stop_step")) {
    autoplay("stop", additionalVars.controlStop);
  }

  if (targetClasses.includes("arrow")) {
    toggleStageDetails(pageLogics.stageDetailsOn);
  }

  if (targetClasses.includes("notifications")) {
    invokeNotificationFade(target, targetClasses);
  }
}

function initiateSimWindow(algorithm) {
  invokeCreatedElements(false);
  additionalVars.treeDrawCanvas.style = "";
  if (algorithm === "Bubble-sort") {
    bubblesortDesc();
  } else if (algorithm === "Insertion-sort") {
    insertionsortDesc();
  } else if (algorithm === "Selection-sort") {
    selectionsortDesc();
  } else if (algorithm === "Quick-sort") {
    quicksortDesc();
  } else if (algorithm === "Merge-sort") {
    mergesortDesc();
  } else if (algorithm === "Counting-sort") {
    countingsortDesc();
  } else if (algorithm === "Bucket-sort") {
    bucketsortDesc();
  } else if (algorithm === "Heapify and Heap-sort") {
    heapsortDesc();
  }

  initialSimulationCall(algorithm);
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

function getPositionBasedOnSimulationPos(elmCont, elm) {
  let mainCont = getPosition(GETDOMQUERY(`.simulation`), 0, 0);
  let elementContMain = getPosition(
    GETDOMQUERY(`.simulation_sec`),
    mainCont[0],
    mainCont[1]
  );
  let elementContMainInner = getPosition(
    elmCont,
    elementContMain[0],
    elementContMain[1]
  );

  let mainElm = getPosition(
    elm,
    elementContMainInner[0],
    elementContMainInner[1]
  );
  return { X: mainElm[0], Y: mainElm[1] };
}

function setlastIlluminated(elements) {
  elements.forEach((element) => {
    additionalVars.lastilluminated.push(element);
  });
}

function getAndProcessInput(algorithm) {
  let input = pageElements.simulationInput.value;
  let processedInput = input.split(/[ ,]+/);
  processedInput = processedInput.filter((n) => n);
  console.log(processedInput);

  let treeProcessedInput = input.split(",");
  if (algorithm === "Heapify and Heap-sort") {
    processTreeStructure(treeProcessedInput);
  }

  // let treeItems = GETDOMQUERY(".tree_item");
  // generateTreeStructure(processedInput);

  // console.log(algorithm);

  algorithmSimData.currentAlgorithmInputData = processedInput;
  generateSimObj(pageElements.simulationCont, processedInput, "c", "i");
}

function processTreeStructure(collection) {
  let edgeList = [];
  let nodeList = [];
  let nodeListSet = new Set();
  for (let i = 0; i < collection.length; i++) {
    let currentEdge = collection[i].split(" ");
    edgeList.push({
      from: currentEdge[0],
      to: currentEdge[1],
      color: "rgba(209, 203, 203, 1)",
    });
    nodeListSet.add(currentEdge[0]);
    nodeListSet.add(currentEdge[1]);
  }

  let nodeListArray = setToArray(nodeListSet);
  for (let i = 0; i < nodeListArray.length; i++) {
    nodeList.push({
      id: nodeListArray[i],
      label: `${nodeListArray[i]}`,
      color: "rgba(209, 203, 203, 1)",
    });
  }

  lastGraphDetails.nodes = nodeList;
  lastGraphDetails.edges = edgeList;
  generateTreeStruct(nodeList, edgeList);
  // console.log(edgeList, nodeList);
}

function generateSimObj(container, collection, outerClass, innerClass) {
  let generatedHtmlSim = "";
  for (let i = 0; i < collection.length; i++) {
    generatedHtmlSim += simObjGen(
      `${outerClass}_${i}`,
      `${innerClass}_${i}`,
      collection[i],
      i
    );
  }
  container.innerHTML = generatedHtmlSim;
}

// function generateTreeStructure(collection) {
//   let generatedHtmlSim = "";
//   for (let i = 0; i < collection.length; i++) {
//     generatedHtmlSim += treeElement(i, collection[i]);
//   }
//   let currentCont = GETDOMQUERY(`.simulation_sec_cont_extra_tree`);
//   currentCont.innerHTML = generatedHtmlSim;
// }

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
  renderStageSuperFunction(commandData, stage);
}

function invokeCreatedElements(bool) {
  if (bool) {
    pageElements.simulationCreatedElementsCont.classList.remove("empty");

    APPLYSTYLES(
      [pageElements.simulationCreatedElementsCont],
      [`width:80%;display:block`]
    );
  } else {
    pageElements.simulationCreatedElementsCont.classList.add("empty");
    APPLYSTYLES(
      [pageElements.simulationCreatedElementsCont],
      [`width:80%;display:block`]
    );

    APPLYSTYLES([pageElements.simulationCreatedElementsCont], [``]);
  }
}

function toggleStageDetails(logic) {
  pageLogics.stageDetailsOn = !logic;
  pageElements.stageDetailsContCont.classList.toggle("stage_visible");
  pageElements.simulationInnerCont.classList.toggle("fit");
  additionalVars.arrowShape.classList.toggle("arrow_flip");
}

function invokeNotificationFade(Element, ElementClass) {
  // console.log(Element);
  if (!ElementClass.includes("fixed_notifications")) {
    Element = Element.closest(".fixed_notifications");
    // console.log(Element);
  }

  APPLYSTYLES([Element], [`transform: translateX(150%)`]);
  TIMEOUT(() => {
    Element.remove();
  }, 500);
  let curId = Element.id;
  CLEARALLINTERVAL([additionalVars.currentIntervals[curId]]);

  additionalVars.notificationTracker.splice(curId, 1);
  if (additionalVars.notificationTracker.length <= 0) {
    additionalVars.currentIntervals = [];
  }
  // console.log(additionalVars.notificationTracker, curId);
}

function notificationCosmetics(notification, multiplier) {
  TIMEOUT(() => {
    let occurredInterval = INTERVAL(
      jumpOnOutNotification.bind(this, notification),
      6000
    );

    additionalVars.currentIntervals.push(occurredInterval);
    // console.log(notification);
  }, 300 * multiplier);
}

function generateAndPushNotification(text) {
  for (
    let i = 0, j = additionalVars.notificationTracker.length;
    i < text.length;
    i++, j++
  ) {
    let notification = generateNotification(j, text[i]);

    additionalVars.notificationTracker.push(notification);

    pageElements.notificationCorner.insertAdjacentHTML(
      "beforeend",
      notification
    );
    let notificationPageElement = GETDOMQUERY(`.fi${j}`);
    APPLYSTYLES([notificationPageElement], ["transform: translateX(150%);"]);
    TIMEOUT(
      APPLYSTYLES.bind(
        this,
        [notificationPageElement],
        ["transform: translateX(0%);"]
      ),
      100
    );
    notificationCosmetics(notificationPageElement, j + 1);
  }
}
