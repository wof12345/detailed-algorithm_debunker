function bubblesortFiller(data, elm1, elm2, flagVar) {
  let constructedDetail = "";
  if (data[0] === "swap") {
    constructedDetail = `${elm1} is greater than ${elm2}. Swap commenced.`;
  } else if (data[0] === "noswap") {
    constructedDetail = `${elm1} is lesser than or equals to ${elm2}. Swap not commenced.`;
  } else {
    constructedDetail = `Final Collection ${data[7]}.`;
  }
  return constructedDetail;
}

function insertionsortFiller(data, elm1, elm2, flagVar) {
  let constructedDetail = "";
  console.log("insertioncalled");

  if (data[0] === "assign") {
    if (data[1] !== data[2])
      constructedDetail = `${elm1} is greater than ${flagVar}. ${elm1} assigned to ${elm2}'s index. `;
    else constructedDetail = `${flagVar} selected as key.`;
  } else if (data[0] === "assignfinal") {
    constructedDetail = ` ${flagVar} assigned to ${elm2}'s index. ${elm1} key-stage ended.`;
  } else {
    constructedDetail = `Final Collection ${data[7]}.`;
  }
  return constructedDetail;
}

function selectionsortFiller(data, elm1, elm2, flagVar) {
  let constructedDetail = "";

  if (data[0] === "assign") {
    constructedDetail = `${elm1} is the minimum most in array scope [${data[4]}-${data[6]}]`;
  } else if (data[0] === "swap") {
    if (data[1] !== data[2])
      constructedDetail = `Swapped ${elm1} and ${elm2}'s position.`;
    else constructedDetail = ` ${elm1} and ${elm2} same element.`;
  } else {
    constructedDetail = `Final Collection ${data[7]}.`;
  }
  return constructedDetail;
}

function quicksortFiller(data, elm1, elm2, flagVar) {
  let constructedDetail = "";

  if (data[0] === "assign") {
    if (data[1] !== data[2])
      constructedDetail = `${elm1} is greater than ${elm2}. ${elm1} assigned to ${elm2}'s index. Array scope [${data[4]}]-[${data[5]}] `;
    else
      constructedDetail = `${flagVar} selected as pivot. Array scope [${data[4]}]-[${data[5]}]`;
  } else if (data[0] === "swap") {
    if (data[1] !== data[2])
      constructedDetail = ` ${elm1} swapped with ${elm2}'s position. Array scope [${data[4]}]-[${data[5]}]`;
    else
      constructedDetail = ` ${elm1} and ${elm2} same element. Array scope [${data[4]}]-[${data[5]}]`;
  } else {
    constructedDetail = `Final Collection ${data[7]}.`;
  }
  return constructedDetail;
}

function mergesortFiller(data, elm1, elm2, flagVar) {
  let constructedDetail = "";

  if (data[0] === "assign") {
    if (data[10])
      constructedDetail = `${elm1} from left created collection is assigned to main collection ${elm2}'s position.`;
    else
      constructedDetail = `${elm1} from right created collection is assigned to main collection ${elm2}'s position.`;
  } else if (data[0] === "scope") {
    constructedDetail = `Array scope created from [${data[1]}] to [${data[2]}]`;
  } else if (data[0] === "create") {
    constructedDetail = `Created two new elements referred as left and right of current scope : ${data[9][0]} and ${data[9][1]}`;
  } else if (data[0] === "scopeout") {
    constructedDetail = `Array scope exited from [${data[1]}] to [${data[2]}]`;
  } else {
    constructedDetail = `Final Collection ${data[7]}.`;
  }
  return constructedDetail;
}

function countingsortFiller(data, elm1, elm2, flagVar) {
  let constructedDetail = "";

  if (data[0] === "assign") {
    if (data[1] !== data[2])
      constructedDetail = `${elm1} is greater than ${elm2}. ${elm1} assigned to ${elm2}'s index. Array scope [${data[4]}]-[${data[5]}] `;
    else
      constructedDetail = `${flagVar} selected as pivot. Array scope [${data[4]}]-[${data[5]}]`;
  } else {
    if (data[1] !== data[2])
      constructedDetail = ` ${elm1} swapped with ${elm2}'s position. Array scope [${data[4]}]-[${data[5]}]`;
    else
      constructedDetail = ` ${elm1} and ${elm2} same element. Array scope [${data[4]}]-[${data[5]}]`;
  }
  return constructedDetail;
}

function bucketsortFiller(data, elm1, elm2, flagVar) {
  let constructedDetail = "";

  if (data[0] === "assign") {
    if (data[1] !== data[2])
      constructedDetail = `${elm1} is greater than ${elm2}. ${elm1} assigned to ${elm2}'s index. Array scope [${data[4]}]-[${data[5]}] `;
    else
      constructedDetail = `${flagVar} selected as pivot. Array scope [${data[4]}]-[${data[5]}]`;
  } else {
    if (data[1] !== data[2])
      constructedDetail = ` ${elm1} swapped with ${elm2}'s position. Array scope [${data[4]}]-[${data[5]}]`;
    else
      constructedDetail = ` ${elm1} and ${elm2} same element. Array scope [${data[4]}]-[${data[5]}]`;
  }
  return constructedDetail;
}

function heapsortFiller(data, elm1, elm2) {
  if (data[0] === "swap") {
    if (data[1] !== data[2])
      constructedDetail = ` ${elm1} swapped with ${elm2}'s position. Array scope [${data[4]}]-[${data[5]}]`;
    else
      constructedDetail = ` ${elm1} and ${elm2} same element. Array scope [${data[4]}]-[${data[5]}]`;
  } else if (data[0] === "information") {
    if (data[6] === 0)
      constructedDetail = `Entering Heapify with ${elm1} as root.`;
    else if (data[6] == 1)
      constructedDetail = `Exiting Heapify for root ${elm1}.`;
    else if (data[6] == 2) {
      if (data[1] !== data[2])
        constructedDetail = `${elm2} is greater than ${elm1}. ${elm2} selected as largest.`;
      else {
        constructedDetail = `${elm1} is the parent and it's left child ${
          data[7][data[4]]
        }, right child ${data[7][data[5]]}`;
      }
    }
  } else {
    constructedDetail = `Final Collection ${data[7]}.`;
  }
  return constructedDetail;
}

function stageFiller(algorithm, stage_no) {
  let detail = "";
  let stage = algorithmSimData.algorithmSequenceInitialInstance[stage_no - 1];
  let refArray = stage[7];
  let elm1 = refArray[stage[1]];
  // console.log(stage);

  let elm2 = refArray[stage[2]];
  let flagVar = stage[6];
  // console.log(refArray);

  if (algorithm === "Bubble-sort") {
    detail = bubblesortFiller(stage, elm1, elm2, flagVar);
  } else if (algorithm === "Insertion-sort") {
    detail = insertionsortFiller(stage, elm1, elm2, flagVar);
  } else if (algorithm === "Selection-sort") {
    detail = selectionsortFiller(stage, elm1, elm2, flagVar);
  } else if (algorithm === "Quick-sort") {
    detail = quicksortFiller(stage, elm1, elm2, flagVar);
  } else if (algorithm === "Merge-sort") {
    detail = mergesortFiller(stage, elm1, elm2, flagVar);
  } else if (algorithm === "Counting-sort") {
    detail = countingsortFiller(stage, elm1, elm2, flagVar);
  } else if (algorithm === "Bucket-sort") {
    detail = bucketsortFiller(stage, elm1, elm2, flagVar);
  } else if (algorithm === "Heapify and Heap-sort") {
    detail = heapsortFiller(stage, elm1, elm2, flagVar);
  }

  return detail;
}
