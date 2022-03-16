function bubblesort(input) {
  let n = input.length;
  let i, j;

  for (i = 0; i < n - 1; i++) {
    for (j = 0; j < n - i - 1; j++) {
      if (input[j] > input[j + 1]) {
        // console.log(`${input[j]} is greater than ${input[j + 1]}`);

        swap(input, j, j + 1);
        algorithmSimData.algorithmSequenceInitialInstance.push([
          "swap",
          j,
          j + 1,
          `innerloop0 ${i}${j}`,
        ]);
      } else {
        algorithmSimData.algorithmSequenceInitialInstance.push([
          "noswap",
          j,
          j + 1,
          `innerloop0 ${i}${j}`,
        ]);
      }
    }
  }
}

function insertionsort(input) {
  let n = input.length;
  let i, key, j;
  for (i = 1; i < n; i++) {
    key = input[i];
    j = i - 1;
    algorithmSimData.algorithmSequenceInitialInstance.push([
      "assign",
      i,
      i,
      `innerloop0 ${i}${j}`,
    ]);

    while (j >= 0 && input[j] > key) {
      input[j + 1] = input[j];
      algorithmSimData.algorithmSequenceInitialInstance.push([
        "assign",
        j,
        j + 1,
        `innerloop0 ${i}${j}`,
      ]);
      j--;
    }
    input[j + 1] = key;
    algorithmSimData.algorithmSequenceInitialInstance.push([
      "assignfinal",
      i,
      j + 1,
      `outerloop0 ${i}`,
    ]);
  }
}

function selectionSort(input) {
  let originalInput = [];
  originalInput += input;
  let iterationNo = 1;
  let n = input.length;
  let i, j, min_idx;

  for (i = 0; i < n - 1; i++, iterationNo++) {
    min_idx = i;
    let foundMinimum = min_idx;
    for (j = i + 1; j < n; j++, iterationNo++) {
      if (input[j] < input[min_idx]) {
        min_idx = j;
        foundMinimum = min_idx;
      }
    }
    j = n - 1;

    swap(input, min_idx, i);
  }
}

function mergesort(array, begin, end, originalInput) {
  if (begin >= end) return;

  let mid = Math.floor(begin + (end - begin) / 2);
  mergesort(array, begin, mid, originalInput);
  mergesort(array, mid + 1, end, originalInput);
  merge(array, begin, mid, end, originalInput);
}

function quickSort(arr, low, high, originalInput) {
  if (low < high) {
    let pi = partition(arr, low, high, originalInput);

    quickSort(arr, low, pi - 1, originalInput);
    quickSort(arr, pi + 1, high, originalInput);
  }
}

function heapSort(input, n) {
  let originalInput = [];
  originalInput += input;
  for (let i = Math.floor(n / 2 - 1); i >= 0; i--) {
    heapify(input, n, i, originalInput);
  }

  for (let i = n - 1; i > 0; i--) {
    swap(input, 0, i);

    heapify(input, i, 0, originalInput);
  }
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
