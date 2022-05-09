function removeEventListeners(collection) {
  collection.forEach((elm) => {
    elm.removeEventListener("mousedown", mouseDownListener);
    elm.removeEventListener("mouseup", mouseUpListener);
  });
}

function initialSimulationCall(algorithm) {
  pageElements.simulationInnerCont.style = " transform: translateY(0px);";
  pageElements.simulationControlCont.style = "display:block";
  generateAndPushNotification([
    "If the input is Numerical then input can be written separated by space or comma.",
  ]);
}

function eliminateSimWindow() {
  pageElements.simulationInnerCont.style = "";
  pageElements.simulationControlCont.style = "";
}

function startBtnProcess() {
  getAndProcessInput(algorithmSimData.currentAlgorithm);
  invokeCreatedElements(false);
  algorithmSimData.algorithmSequenceCompleteInstance = [];
  algorithmSimData.algorithmSequenceInitialInstance = [];
  let input = algorithmSimData.currentAlgorithmInputData;

  algorithmSimData.algorithmSimStage = -1;
  input = numberify(input);
  algorithmSimData.currentAlgorithmInputDataOrigin = [...input];

  console.log(algorithmSimData.currentAlgorithm);
  switch (algorithmSimData.currentAlgorithm) {
    case "Bubble-sort":
      bubblesort(input);
      break;
    case "Insertion-sort":
      insertionsort(input);
      break;
    case "Selection-sort":
      selectionSort(input);
      break;
    case "Quick-sort":
      quickSort(input, 0, input.length - 1);
      break;
    case "Merge-sort":
      mergeSort(input, 0, input.length - 1);
      break;
    case "Heapify and Heap-sort":
      heapSort(input, input.length);
      break;
    default:
      break;
  }

  generateStages(algorithmSimData.algorithmSequenceInitialInstance);
  console.log(algorithmSimData.algorithmSequenceInitialInstance);
}

function resetLastIlluminate() {
  let currentIlluminated = additionalVars.lastilluminated;
  for (let i = 0; i < currentIlluminated.length; i++) {
    currentIlluminated[i].style = "";
  }
  additionalVars.lastilluminated = [];
}

function stageCallHandler(command) {
  resetLastIlluminate();
  // console.log(algorithmSimData.algorithmSimStage);
  if (command === "next") {
    if (
      algorithmSimData.algorithmSequenceInitialInstance.length - 1 >
      algorithmSimData.algorithmSimStage
    ) {
      controlAlgorithmSimStage(
        algorithmSimData.algorithmSequenceInitialInstance[
          ++algorithmSimData.algorithmSimStage
        ],
        algorithmSimData.algorithmSimStage + 1
      );
    } else {
      algorithmSimData.algorithmSimStage = -1;
      algorithmSimData.animationDone = true;
      invokeCreatedElements(false);

      generateSimObj(
        pageElements.simulationCont,
        algorithmSimData.currentAlgorithmInputDataOrigin,
        "c",
        "i"
      );
    }
  } else {
    if (algorithmSimData.algorithmSimStage >= 0) {
      controlAlgorithmSimStage(
        algorithmSimData.algorithmSequenceInitialInstance[
          algorithmSimData.algorithmSimStage--
        ],
        algorithmSimData.algorithmSimStage + 1
      );
    } else {
      algorithmSimData.algorithmSimStage =
        algorithmSimData.algorithmSequenceInitialInstance.length - 1;
      algorithmSimData.animationDone = true;
      invokeCreatedElements(false);

      generateSimObj(
        pageElements.simulationCont,
        algorithmSimData.currentAlgorithmInputDataOrigin,
        "c",
        "i"
      );
    }
  }
}

function autoplay(command, target) {
  CLEARALLINTERVAL([additionalVars.currentAutoPlayState]);
  additionalVars.currentAutoPlayState = [];

  APPLYSTYLES(
    [target, additionalVars.lastActivatedButtonAlgorithmControl],
    ["background-color: rgba(125, 125, 126, 0.411);", ""]
  );
  additionalVars.lastActivatedButtonAlgorithmControl = target;

  if (command === "start") {
    let intervalOption = parseInt(pageElements.stepIntervalControl.value);
    intervalOption *= 1000;
    if (intervalOption <= 1000) {
      intervalOption = 1100;
    }
    // console.log(intervalOption);

    additionalVars.currentAutoPlayState.push(
      INTERVAL(stageCallHandler.bind(this, "next"), intervalOption)
    );
  }
}

function jumpOnOutNotification(notification) {
  // console.log(notification);

  APPLYSTYLES([notification], ["transform: translateX(10%);"]);

  TIMEOUT(APPLYSTYLES.bind(this, [notification], [""]), 300);
  // console.log("called");
}

function renderStageSuperFunction(commandData, stageNo) {
  let currentArray = commandData[7];
  generateSimObj(pageElements.simulationCont, currentArray, "c", "i");
  let command = commandData[0];

  let swapContainer = GETDOMQUERY(`.i_${commandData[1]}`);
  let swapeeContainer = GETDOMQUERY(`.i_${commandData[2]}`);
  let stage = GETDOMQUERY(`.s_${stageNo}`);
  let stageDetails = GETDOMQUERY(`.sd_${stageNo}`);

  let createdCont = pageElements.simulationCreatedElementsCont;
  let createdElements = commandData[9];

  let swapContainerContPos = GETDOMQUERY(`.c_${commandData[1]}`);
  let swapeeContainerContPos = GETDOMQUERY(`.c_${commandData[2]}`);
  let flagElement = GETDOMQUERY(`.c_${commandData[8] ? commandData[8] : null}`);
  let midFactor = commandData[5];

  let currentMidCont = GETDOMQUERY(`.c_${midFactor}`);
  // console.log("mid", currentMidCont);
  let swapElm = swapContainer.innerHTML;

  let swapPos = getPositionBasedOnSimulationPos(
    pageElements.simulationCont,
    swapContainerContPos
  );
  let swapeePos = getPositionBasedOnSimulationPos(
    pageElements.simulationCont,
    swapeeContainerContPos
  );

  // console.log(swapPos.X, swapeePos.X);

  // console.log(swapContainer, swapeeContainer, commandData, stageNo);
  flagElement.style = `background-color:aqua;`; //flag

  if (command === "swap") {
    APPLYSTYLES(
      [swapContainer, swapeeContainer, stage, stageDetails],
      [
        `background-color:red;transform: translate(${
          swapeePos.X - swapPos.X
        }px,${swapeePos.Y - swapPos.Y}px);`,
        `background-color:red;transform: translate(${
          (swapPos.X - swapeePos.X) / 2
        }px,${-32}px);`,
        `background-color:black; color:white;`,
        `background-color:black; color:white;`,
      ]
    );

    TIMEOUT(
      APPLYSTYLES.bind(
        this,
        [swapeeContainer],
        [
          `background-color:red;   transform: translate(${
            swapPos.X - swapeePos.X
          }px,${swapPos.Y - swapeePos.Y}px);`,
        ]
      ),
      500
    );

    TIMEOUT(
      APPLYSTYLES.bind(
        this,
        [swapContainer, swapeeContainer],
        [
          `background-color:red;transition:0s;`,
          `background-color:red;transition:0s;`,
        ]
      ),
      1000
    );

    TIMEOUT(() => {
      setlastIlluminated([
        swapContainer,
        swapeeContainer,
        stage,
        stageDetails,
        flagElement,
      ]);

      swapContainer.innerHTML = swapeeContainer.innerHTML;
      swapeeContainer.innerHTML = swapElm;
      algorithmSimData.animationDone = true;
    }, 1000);
  } else if (command === "noswap") {
    setlastIlluminated([
      swapContainer,
      swapeeContainer,
      stage,
      stageDetails,
      flagElement,
    ]);

    APPLYSTYLES(
      [swapContainer, swapeeContainer, stage, stageDetails],
      [
        `background-color:blue;`,
        `background-color:blue;`,
        `background-color:black; color:white;`,
        `background-color:black; color:white;`,
      ]
    );
    algorithmSimData.animationDone = true;
  } else if (command === "assign") {
    // console.log(swapContainer, swapeeContainer);
    if (commandData[10] !== undefined) {
      let extraOuterContainer = GETDOMQUERY(
        `.simulation_sec_cont_extra_${commandData[10]}`
      );
      // console.log("eC", extraOuterContainer);

      swapContainer = GETDOMQUERY(`.ie${commandData[10]}_${commandData[1]}`);
      // console.log("Swap", commandData[10], commandData[1]);
      swapContainerContPos = GETDOMQUERY(
        `.ce${commandData[10]}_${commandData[1]}`
      );
      swapPos = getPositionBasedOnSimulationPos(
        extraOuterContainer,
        swapContainer
      );
      swapElm = swapContainer.innerHTML;
      // console.log(swapContainer, `.ie${commandData[10]}_${commandData[1]}`);
      // console.log("changed swap:", swapElm);
    }

    APPLYSTYLES(
      [swapContainer, swapeeContainer, stage, stageDetails],
      [
        `background-color:green;  transform: translate(${
          swapeePos.X - swapPos.X
        }px,${swapeePos.Y - swapPos.Y}px);`,
        `background-color:yellowgreen; transform : translate(${0}px,${-32}px);`,
        `background-color:black; color:white;`,
        `background-color:black; color:white;`,
      ]
    );
    TIMEOUT(() => {
      APPLYSTYLES(
        [swapContainer, swapeeContainer, stage, stageDetails],
        [
          `background-color:yellowgreen;  transform: translate(${
            swapeePos.X - swapPos.X
          }px,${swapeePos.Y - swapPos.Y}px);opacity:0;`,
          `background-color:green;`,
          `background-color:black; color:white;`,
          `background-color:black; color:white;`,
        ]
      );
      setlastIlluminated([swapContainer, stage, stageDetails, flagElement]);

      swapContainer.innerHTML = swapeeContainer.innerHTML;
      swapeeContainer.innerHTML = swapElm;
      algorithmSimData.animationDone = true;
    }, 700);
  } else if (command === "assignfinal") {
    APPLYSTYLES(
      [swapContainer, swapeeContainer, stage, stageDetails],
      [
        ``,
        `background-color:yellowgreen; transform : translate(${0}px,${-32}px);`,
        `background-color:black; color:white;`,
        `background-color:black; color:white;`,
      ]
    );

    TIMEOUT(() => {
      APPLYSTYLES(
        [swapContainerContPos, swapeeContainer, stage, stageDetails],
        [
          ``,
          `background-color:yellowgreen; `,
          `background-color:black; color:white;`,
          `background-color:black; color:white;`,
        ]
      );
    }, 700);
    setlastIlluminated([
      swapeeContainer,
      swapContainer,
      stage,
      stageDetails,
      flagElement,
    ]);
    algorithmSimData.animationDone = true;
  } else if (command === "scope") {
    APPLYSTYLES(
      [
        swapContainer,
        swapeeContainer,
        swapContainerContPos,
        swapeeContainerContPos,
        stage,
        stageDetails,
      ],
      [
        `background-color:violet; `,
        `background-color:violet; `,
        `margin-left:20px`,
        `margin-right:20px`,
        `background-color:black; color:white;`,
        `background-color:black; color:white;`,
      ]
    );

    setlastIlluminated([stage, stageDetails, swapContainer, swapeeContainer]);
    algorithmSimData.animationDone = true;
  } else if (command === "scopeout") {
    // console.log(midFactor, commandData[5] % 2 !== 0);

    APPLYSTYLES(
      [
        swapContainerContPos,
        swapeeContainerContPos,
        currentMidCont,
        stage,
        stageDetails,
      ],
      [
        ``,
        `margin-right:20px`,
        ``,
        `background-color:black; color:white;`,
        `background-color:black; color:white;`,
      ]
    );
    setlastIlluminated([stage, stageDetails]);
    algorithmSimData.animationDone = true;
  } else if (command === "create") {
    createdCont.innerHTML = "";
    // console.log(command);
    APPLYSTYLES(
      [currentMidCont, stage, stageDetails],
      [
        ``,
        `background-color:black; color:white;`,
        `background-color:black; color:white;`,
      ]
    );
    setlastIlluminated([stage, stageDetails]);
    invokeCreatedElements(true);
    for (let i = 0; i < createdElements.length; i++) {
      createdCont.insertAdjacentHTML("beforeend", extraElements(i));
      let currentCont = GETDOMQUERY(`.simulation_sec_cont_extra_${i}`);
      generateSimObj(currentCont, createdElements[i], `ce${i}`, `ie${i}`);
    }
    algorithmSimData.animationDone = true;
  } else if (command === "finalstate") {
    // console.log(commandData[7]);
    APPLYSTYLES(
      [stage, stageDetails],
      [
        `background-color:black; color:white;`,
        `background-color:black; color:white;`,
      ]
    );
    setlastIlluminated([stage, stageDetails]);

    for (let i = 0; i <= currentArray.length - 1; i++) {
      let Element = GETDOMQUERY(`.i_${i}`);
      // console.log(Element);

      APPLYSTYLES([Element], ["background-color:green;"]);
      additionalVars.lastilluminated.push(Element);
    }
    algorithmSimData.animationDone = true;
  } else if (command === "information") {
    APPLYSTYLES(
      [stage, stageDetails, swapContainer, swapeeContainer],
      [
        `background-color:black; color:white;`,
        `background-color:black; color:white;`,
        `background-color:yellow;`,
        `background-color:yellow; `,
      ]
    );
    setlastIlluminated([stage, stageDetails, swapContainer, swapeeContainer]);
    algorithmSimData.animationDone = true;
  }
  // console.log(command, swapContainer, swapeeContainer);
}
