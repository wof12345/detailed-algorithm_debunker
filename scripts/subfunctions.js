function initialSimulationCall(algorithm) {
  pageElements.simulationInnerCont.style = " transform: translateY(0px);";
  pageElements.simulationControlCont.style = "display:block";
}

function eliminateSimWindow() {
  pageElements.simulationInnerCont.style = "";
  pageElements.simulationControlCont.style = "";
}

function startBtnProcess() {
  getAndProcessInput();
  algorithmSimData.algorithmSequenceCompleteInstance = [];
  algorithmSimData.algorithmSequenceInitialInstance = [];

  algorithmSimData.algorithmSimStage = -1;
  algorithmSimData.currentAlgorithmInputData = numberify(
    algorithmSimData.currentAlgorithmInputData
  );
  algorithmSimData.currentAlgorithmInputDataOrigin = [
    ...algorithmSimData.currentAlgorithmInputData,
  ];

  console.log(algorithmSimData.currentAlgorithmInputData);
  switch (algorithmSimData.currentAlgorithm) {
    case "Bubble-sort":
      bubblesort(algorithmSimData.currentAlgorithmInputData);
      break;
    case "Insertion-sort":
      insertionsort(algorithmSimData.currentAlgorithmInputData);
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
      generateSimObj(algorithmSimData.currentAlgorithmInputDataOrigin);
      algorithmSimData.animationDone = true;
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

      generateSimObj(algorithmSimData.currentAlgorithmInputData);
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

function renderStageSuperFunction(commandData, stageNo) {
  let command = commandData[0];

  let swapContainer = GETDOMQUERY(`.i_${commandData[1]}`);
  let swapeeContainer = GETDOMQUERY(`.i_${commandData[2]}`);
  let stage = GETDOMQUERY(`.s_${stageNo}`);
  let stageDetails = GETDOMQUERY(`.sd_${stageNo}`);

  let swapContainerContPos = GETDOMQUERY(`.c_${commandData[1]}`);
  let swapeeContainerContPos = GETDOMQUERY(`.c_${commandData[2]}`);
  let swapElm = swapContainer.innerHTML;

  let swapPos = getPosition(swapContainerContPos, 0, 0);
  let swapeePos = getPosition(swapeeContainerContPos, 0, 0);

  // console.log(swapContainer, swapeeContainer, commandData, stageNo);

  if (command === "swap") {
    APPLYSTYLES(
      [swapContainer, swapeeContainer, stage, stageDetails],
      [
        `background-color:red;transform: translate(${
          swapeePos[0] - swapPos[0]
        }px,${swapeePos[1] - swapPos[1]}px);`,
        `background-color:red;transform: translate(${
          (swapPos[0] - swapeePos[0]) / 2
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
            swapPos[0] - swapeePos[0]
          }px,${swapPos[1] - swapeePos[1]}px);`,
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
      setlastIlluminated([swapContainer, swapeeContainer, stage, stageDetails]);

      swapContainer.innerHTML = swapeeContainer.innerHTML;
      swapeeContainer.innerHTML = swapElm;
      algorithmSimData.animationDone = true;
    }, 1000);
  } else if (command === "noswap") {
    setlastIlluminated([swapContainer, swapeeContainer, stage, stageDetails]);

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

    APPLYSTYLES(
      [swapContainer, swapeeContainer, stage, stageDetails],
      [
        `background-color:green;  transform: translate(${
          swapeePos[0] - swapPos[0]
        }px,${swapeePos[1] - swapPos[1]}px);`,
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
            swapeePos[0] - swapPos[0]
          }px,${swapeePos[1] - swapPos[1]}px);opacity:0;`,
          `background-color:green;`,
          `background-color:black; color:white;`,
          `background-color:black; color:white;`,
        ]
      );
      setlastIlluminated([swapContainer, stage, stageDetails]);

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
        [swapContainer, swapeeContainer, stage, stageDetails],
        [
          ``,
          `background-color:yellowgreen; `,
          `background-color:black; color:white;`,
          `background-color:black; color:white;`,
        ]
      );
    }, 700);
    setlastIlluminated([swapeeContainer, swapContainer, stage, stageDetails]);
    algorithmSimData.animationDone = true;
  }
}
