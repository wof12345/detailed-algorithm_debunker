function startBtnProcess() {
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

  bubblesort(algorithmSimData.currentAlgorithmInputData);
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

function autoplay(command) {
  if (command === "start") {
    let intervalOption = parseInt(pageElements.stepIntervalControl.value);
    intervalOption *= 1000;
    if (intervalOption <= 1000) {
      intervalOption = 1100;
    }
    console.log(intervalOption);

    additionalVars.currentIntervals.push(
      INTERVAL(stageCallHandler.bind(this, "next"), intervalOption)
    );
  } else {
    CLEARALLINTERVAL([additionalVars.currentIntervals]);
    additionalVars.currentIntervals = [];
  }
}

function animationSwapSquence(commandData, stageNo) {
  let swapContainer = GETDOMQUERY(`.i_${commandData[1]}`);
  let swapeeContainer = GETDOMQUERY(`.i_${commandData[2]}`);
  let stage = GETDOMQUERY(`.s_${stageNo}`);

  let swapContainerContPos = GETDOMQUERY(`.c_${commandData[1]}`);
  let swapeeContainerContPos = GETDOMQUERY(`.c_${commandData[2]}`);

  let swapPos = getPosition(swapContainerContPos, 0, 0);
  let swapeePos = getPosition(swapeeContainerContPos, 0, 0);

  // console.log(swapContainer, swapeeContainer, commandData, stageNo);

  APPLYSTYLES(
    [swapContainer, swapeeContainer, stage],
    [
      `background-color:red;transform: translate(${
        swapeePos[0] - swapPos[0]
      }px,${swapeePos[1] - swapPos[1]}px);`,
      `background-color:red;transform: translate(${-5}px,${-32}px);`,
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
    setlastIlluminated([swapContainer, swapeeContainer, stage]);

    let swapElm = swapContainer.innerHTML;

    swapContainer.innerHTML = swapeeContainer.innerHTML;
    swapeeContainer.innerHTML = swapElm;
    algorithmSimData.animationDone = true;
  }, 1000);
}

function animationNoSwapSquence(commandData, stageNo) {
  let swapContainer = GETDOMQUERY(`.i_${commandData[1]}`);
  let swapeeContainer = GETDOMQUERY(`.i_${commandData[2]}`);
  let stage = GETDOMQUERY(`.s_${stageNo}`);

  // console.log(commandData, stageNo);

  setlastIlluminated([swapContainer, swapeeContainer, stage]);

  APPLYSTYLES(
    [swapContainer, swapeeContainer, stage],
    [
      "background-color:blue;",
      "background-color:blue;",
      `background-color:black; color:white;`,
    ]
  );
  algorithmSimData.animationDone = true;
}
