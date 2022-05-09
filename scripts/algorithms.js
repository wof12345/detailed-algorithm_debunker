function bubblesort(input) {
  let n = input.length;
  let inputCopy = [...input];
  let i, j;

  for (i = 0; i < n - 1; i++) {
    for (j = 0; j < n - i - 1; j++) {
      inputCopy = [...input];
      if (input[j] > input[j + 1]) {
        swap(input, j, j + 1);
        algorithmSimData.algorithmSequenceInitialInstance.push([
          "swap",
          j,
          j + 1,
          `innerloop0 ${i}${j}`,
          i,
          j,
          n,
          inputCopy,
        ]);
      } else {
        algorithmSimData.algorithmSequenceInitialInstance.push([
          "noswap",
          j,
          j + 1,
          `innerloop0 ${i}${j}`,
          i,
          j,
          n,
          inputCopy,
        ]);
      }
    }
  }
  algorithmSimData.algorithmSequenceInitialInstance.push([
    "finalstate",
    j,
    j + 1,
    `innerloop0 ${i}${j}`,
    i,
    j,
    n,
    input,
  ]);
}

function insertionsort(input) {
  let n = input.length;
  let inputCopy = [...input];
  let i, key, j;
  for (i = 1; i < n; i++) {
    key = input[i];
    j = i - 1;
    algorithmSimData.algorithmSequenceInitialInstance.push([
      "assign",
      i,
      i,
      `innerloop0 ${i}${j}`,
      i,
      j,
      key,
      inputCopy,
      i,
    ]);

    while (j >= 0 && input[j] > key) {
      inputCopy = [...input];
      input[j + 1] = input[j];
      algorithmSimData.algorithmSequenceInitialInstance.push([
        "assign",
        j,
        j + 1,
        `innerloop0 ${i}${j}`,
        i,
        j,
        key,
        inputCopy,
        i,
      ]);

      j--;
    }
    input[j + 1] = key;
    inputCopy = [...input];

    algorithmSimData.algorithmSequenceInitialInstance.push([
      "assignfinal",
      i,
      j + 1,
      `outerloop0 ${i}`,
      i,
      j,
      key,
      inputCopy,
      i,
    ]);
  }
  algorithmSimData.algorithmSequenceInitialInstance.push([
    "finalstate",
    j,
    j + 1,
    `innerloop0 ${i}${j}`,
    i,
    j,
    key,
    input,
  ]);
}

function selectionSort(input) {
  let n = input.length;
  let inputCopy = [...input];
  let i, j, min_idx;

  for (i = 0; i < n - 1; i++) {
    min_idx = i;
    let foundMinimum = min_idx;
    for (j = i + 1; j < n; j++) {
      inputCopy = [...input];
      if (input[j] < input[min_idx]) {
        min_idx = j;
        foundMinimum = min_idx;
        algorithmSimData.algorithmSequenceInitialInstance.push([
          "assign",
          foundMinimum,
          min_idx,
          `innerloop0 ${i}${j}`,
          i,
          j,
          n,
          inputCopy,
        ]);
      }
    }
    j = n - 1;
    inputCopy = [...input];
    swap(input, min_idx, i);
    algorithmSimData.algorithmSequenceInitialInstance.push([
      "swap",
      min_idx,
      i,
      `outerloop0 ${i}${j}`,
      i,
      j,
      n,
      inputCopy,
    ]);
  }
  algorithmSimData.algorithmSequenceInitialInstance.push([
    "finalstate",
    j,
    j + 1,
    `innerloop0 ${i}${j}`,
    i,
    j,
    n,
    input,
  ]);
}

function quickSort(arr, low, high) {
  // console.log("quicksort", low, high);

  if (low < high) {
    let pi = partition(arr, low, high);
    // console.log("quicksort", pi);

    quickSort(arr, low, pi - 1);
    quickSort(arr, pi + 1, high);
  }
  if (low === 0 && high === arr.length - 1) {
    algorithmSimData.algorithmSequenceInitialInstance.push([
      "finalstate",
      low,
      high,
      `innerloop0 ${low}${high}`,
      low,
      high,
      high,
      arr,
    ]);
  }
}

function mergeSort(array, begin, end) {
  if (begin >= end) return;

  let inputCopy = [...array];
  let mid = Math.floor(begin + (end - begin) / 2);
  algorithmSimData.algorithmSequenceInitialInstance.push([
    "scope",
    begin,
    end,
    `outerrecursionloop0 ${end}${begin}`,
    begin,
    end,
    end - 1,
    inputCopy,
    mid,
  ]);
  mergeSort(array, begin, mid);
  mergeSort(array, mid + 1, end);
  merge(array, begin, mid, end);
  if (begin === 0 && end === array.length - 1) {
    algorithmSimData.algorithmSequenceInitialInstance.push([
      "finalstate",
      begin,
      end,
      `innerloop0 ${begin}${end}`,
      begin,
      end,
      end,
      array,
    ]);
  }
}

function heapSort(input, n) {
  let inputCopy;
  for (let i = Math.floor(n / 2 - 1); i >= 0; i--) {
    inputCopy = [...input];
    algorithmSimData.algorithmSequenceInitialInstance.push([
      "information",
      i,
      n,
      `heapSort ${i} hp`,
      n,
      n,
      0,
      inputCopy,
      null,
    ]);
    heapify(input, n, i);
  }
  inputCopy = [...input];

  for (let i = n - 1; i > 0; i--) {
    console.log("bs: ", input, i);

    algorithmSimData.algorithmSequenceInitialInstance.push([
      "swap",
      0,
      i,
      `heapify ${0}${i} hs`,
      0,
      i,
      n,
      inputCopy,
      null,
    ]);
    swap(input, 0, i);
    console.log("as: ", input, i);
    inputCopy = [...input];
    algorithmSimData.algorithmSequenceInitialInstance.push([
      "information",
      0,
      0,
      `heapSort ${i} hs`,
      i,
      n,
      0,
      inputCopy,
      null,
    ]);
    heapify(input, i, 0);
  }
  algorithmSimData.algorithmSequenceInitialInstance.push([
    "finalstate",
    0,
    n - 1,
    `innerloop0 ${0}${n}`,
    0,
    n,
    n - 1,
    input,
  ]);
  // console.log("Changed 2: ", input);
}

function BFS() {
  let currentNode = currentGraphInfo.currentArrayState.pop();
  // console.log(`Adjacents of ${currentNode} : `, currentGraphInfo.graphRelations[currentNode]);
  currentGraphInfo.graphRelations[currentNode].forEach((element) => {
    if (currentGraphInfo.visitState[element] === -1) {
      currentGraphInfo.visitState[element] =
        currentGraphInfo.visitState[currentNode] + 1;
      currentGraphInfo.currentArrayState.push(element);
      currentGraphInfo.iterationSerial.push(element);

      // console.log(currentGraphInfo.visitState[element], currentGraphInfo.visitState[currentNode], currentGraphInfo.currentArrayState);
    } else {
    }
  });
  if (currentGraphInfo.currentArrayState.length <= 0) {
    return;
  }
  BFS();
}

function DFS(currentSource, parent) {
  console.log("Visited : ", currentSource);
  currentGraphInfo.tsSortstartTime[currentSource] = currentGraphInfo.timeVar++;

  for (
    let i = 0;
    i < currentGraphInfo.graphRelations[currentSource].length;
    i++
  ) {
    let currentAdjacent = currentGraphInfo.graphRelations[currentSource][i];
    if (currentGraphInfo.visitState[currentAdjacent] === -1) {
      currentGraphInfo.visitState[currentAdjacent] = 1;
      currentGraphInfo.iterationSerial.push(currentSource);
      DFS(currentAdjacent, currentSource);
    } else if (
      currentAdjacent !== parent &&
      currentGraphInfo.visitState[currentAdjacent] !== 2
    ) {
      currentGraphInfo.cycles++;
    }
  }

  currentGraphInfo.visitState[currentSource] = 2;
  currentGraphInfo.tsSortendTime[currentSource] = currentGraphInfo.timeVar++;
}

function Dijkstra(target) {
  while (!currentGraphInfo.priorityQueue.isEmpty()) {
    console.log(`PQ elements : `, currentGraphInfo.priorityQueue.printPQueue());
    let currentNode = +currentGraphInfo.priorityQueue.front().element;

    currentGraphInfo.priorityQueue.remove();
    if (currentNode === target) break;
    for (
      let i = 0;
      i < currentGraphInfo.graphRelations[currentNode].length;
      i++
    ) {
      let neighborNode = +currentGraphInfo.graphRelations[currentNode][i];
      let weightToNode = +currentGraphInfo.weights[currentNode][i];
      // console.log('Current Node:', currentNode);
      // console.log('neighbor and weight : ', neighborNode, weightToNode);
      // console.log('visitstate : ', currentGraphInfo.visitState[currentNode], weightToNode, currentGraphInfo.visitState[neighborNode]);
      if (
        currentGraphInfo.visitState[currentNode] + weightToNode <
        currentGraphInfo.visitState[neighborNode]
      ) {
        // console.log(`Visitstate of ${neighborNode} before sum : ${currentGraphInfo.visitState[neighborNode]}`);
        currentGraphInfo.visitState[neighborNode] =
          currentGraphInfo.visitState[currentNode] + weightToNode;
        currentGraphInfo.priorityQueue.push(
          neighborNode,
          currentGraphInfo.visitState[neighborNode]
        );
        // console.log(`Visitstate of ${neighborNode} after sum : ${currentGraphInfo.visitState[neighborNode]}`);
        // console.log(`node ${currentNode}th process : `, currentGraphInfo.visitState[neighborNode]);
      } else {
        // console.log(`Visitstate of ${neighborNode} after sum : ${currentGraphInfo.visitState[neighborNode]}`);
        // console.log(`Tried to visit ${currentNode}, neighbor ${neighborNode}`);
      }
    }
  }
}
