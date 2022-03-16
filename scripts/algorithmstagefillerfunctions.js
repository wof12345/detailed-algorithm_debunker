function bubblesortFiller(data, elm1, elm2) {
  let constructedDetail = "";
  if (data[0] === "swap") {
    constructedDetail = `${elm1} is greater than ${elm2}. Swap commenced.`;
  } else {
    constructedDetail = `${elm1} is lesser than ${elm2}. Swap not commenced.`;
  }
  return constructedDetail;
}

function insertionsortFiller(data, elm1, elm2) {
  let constructedDetail = "";

  if (data[0] === "assign") {
    if (elm1 !== elm2)
      constructedDetail = `${elm1} is greater than ${elm2}. ${elm1} assigned to ${elm2}'s index. `;
    else constructedDetail = `${elm1} selected as key.`;
  } else {
    constructedDetail = ` ${elm1} assigned to ${elm2}'s index. ${elm1} key-stage ended.`;
  }
  return constructedDetail;
}

function stageFiller(algorithm, stage_no) {
  let detail = "";
  let stage = algorithmSimData.algorithmSequenceInitialInstance[stage_no - 1];
  let elm1 = algorithmSimData.currentAlgorithmInputDataOrigin[stage[1]];

  let elm2 = algorithmSimData.currentAlgorithmInputDataOrigin[stage[2]];

  if (algorithm === "Bubble-sort") {
    detail = bubblesortFiller(stage, elm1, elm2);
  } else if (algorithm === "Insertion-sort") {
    detail = insertionsortFiller(stage, elm1, elm2);
  }

  return detail;
}
